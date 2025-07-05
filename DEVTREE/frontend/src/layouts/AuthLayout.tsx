import { Link } from "react-router-dom";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <div className="bg-slate-800 min-h-screen">
          <div className="max-w-lg mx-auto pt-10 px-5">    
            <img src="/logo.svg" alt="Logotipo de DevTree" />
            <div className="py-10">
              <h1 className="text-white">Inicia Sesión</h1>
            </div>
          </div>
        </div>
        {children}
      </>
    )
}