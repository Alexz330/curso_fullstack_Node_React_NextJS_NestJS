import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { validateUrl } from "../utils";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { updateProfile } from "../api/DevTreeAPI";
import type { DevTreeLink, SocialNetwork, User } from "../types";

export default function LinkTreeView() {
  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData<User>(["user"])!;
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Perfil actualizado correctamente");
    },
  });

  useEffect(() => {
    const updateData = devTreeLinks.map((item) => {
      const userLink = JSON.parse(user.links).find(
        (link: DevTreeLink) => link.name === item.name
      );

      if (userLink) {
        return {
          ...item,
          url: userLink.url,
          enabled: userLink.enabled,
        };
      }
      return item;
    });

    setDevTreeLinks(updateData);
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    const name = e.target.name;

    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === name) {
        return {
          ...link,
          url,
        };
      }
      return link;
    });

    setDevTreeLinks(updatedLinks);
  };

  const links: SocialNetwork[] = JSON.parse(user.links);

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (!validateUrl(link.url)) {
          toast.error("URL invalida");
          return link;
        }
        return {
          ...link,
          enabled: !link.enabled,
        };
      }
      return link;
    });

    setDevTreeLinks(updatedLinks);
    let updateItems: SocialNetwork[] = [];
    const selectedSocialNetwork = updatedLinks.find(
      (link) => link.name === socialNetwork
    );

    if (selectedSocialNetwork?.enabled) {
      const id = links.filter((link) => link.id).length + 1;
      if (links.some((link) => link.name === selectedSocialNetwork?.name)) {
        updateItems = links.map((link) => {
          if (link.name === selectedSocialNetwork?.name) {
            return {
              ...link,
              id,
            };
          }
          return link;
        });
      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id,
        };
        updateItems = [...links, newItem];
      }
    } else {
      const indexToUpdate = links.findIndex(
        (link) => link.name === selectedSocialNetwork?.name
      );
      updateItems = links.map((link, index) => {
        if (link.name === selectedSocialNetwork?.name) {
          return {
            ...link,
            enabled: false,
            id: 0,
          };
        } else if (link.id > indexToUpdate &&(indexToUpdate !== 0 && link.id ===1)) {
          return {
            ...link,
            id: link.id - 1,
          };
        } else {
          return link;
        }
      });
    }

    queryClient.setQueryData(["user"], {
      ...user,
      links: JSON.stringify(updateItems),
    });
  };

  return (
    <div className="space-y-5">
      {devTreeLinks.map((item) => (
        <DevTreeInput
          key={item.name}
          item={item}
          handleUrlChange={handleUrlChange}
          handleEnableLink={handleEnableLink}
        />
      ))}
      <button
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold "
        onClick={() => mutate(user)}
      >
        Guardar Cambios
      </button>
    </div>
  );
}
