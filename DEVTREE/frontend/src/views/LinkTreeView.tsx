import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { validateUrl } from "../utils";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { updateProfile } from "../api/DevTreeAPI";
import type { DevTreeLink, User } from "../types";

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
   
      const userLink = JSON.parse(user.links).find((link: DevTreeLink) => link.name === item.name);
      console.log(userLink);
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
    console.log(updatedLinks);
    setDevTreeLinks(updatedLinks);
  };

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
    queryClient.setQueryData(["user"], {
      ...user,
      links: JSON.stringify(updatedLinks),
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
