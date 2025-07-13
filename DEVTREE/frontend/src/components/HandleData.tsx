import type { SocialNetwork, UserHandle } from "../types";

type HandleDataProps = {
    data: UserHandle;
}


export default function HandleData({ data }: HandleDataProps) {
    const links: SocialNetwork[] = JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled);
    return (
        <div className="space-y-6 text-white">
            <h1 className="text-5xl text-center font-black">{data.handle}</h1>
            {data.image && (
                <img src={data.image} alt="" className="mx-auto max-w-[250px]" />
            )}
            <p className="text-center text-lg font-bold">{data.description}</p>
            <div className="mt-20 flex flex-col gap-6">
                {links.length  ? 
                links.map((link) => (
                  <a className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg" href={link.url} target="_blank" rel="noreferrer noopener">
                    <img src={`/social/icon_${link.name}.svg`} alt="" className="w-12 h-12" />
                    <p className="capitalize text-slate-800 text-lg font-bold">Visita mi: <span className="text-slate-800 font-black">{link.name}</span></p>
                  </a>
                ))
                : <p className="text-center text-lg font-bold">No hay links</p>}
            </div>
        </div>
    );
}