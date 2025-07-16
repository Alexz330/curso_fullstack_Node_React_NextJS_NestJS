import { Link } from "react-router-dom";


export default function HomeNavigation() {

    return (
       <>
            <Link className="text-white p-2 uppercase font-black text-xs cursor-pointer"
            to="/"
            >
                Iniciar Sesión
            </Link>
       </>
    );
}