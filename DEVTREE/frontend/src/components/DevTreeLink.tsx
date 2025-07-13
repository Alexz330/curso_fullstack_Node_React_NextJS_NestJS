import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { SocialNetwork } from "../types";

type DevTreeLinkProps = {
  link: SocialNetwork;
};

export default function DevTreeLink({ link }: DevTreeLinkProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: link.id,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <li
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
    >
      <div
        className="w-12 h-12 bg-cover"
        style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}
      ></div>
      <p className="capitalize">
        Visita mi: <span className="font-black">{link.name}</span>
      </p>
    </li>
  );
}
