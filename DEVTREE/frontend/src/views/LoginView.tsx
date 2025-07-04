import { Link } from "react-router-dom";

export default function LoginView() {
  return (
    <>
      <div className="">Login View</div>
      <nav>
        <Link to="/auth/register">Ya tiene una cuenta? Inicia Sesión</Link>
      </nav>
    </>
  );
}
