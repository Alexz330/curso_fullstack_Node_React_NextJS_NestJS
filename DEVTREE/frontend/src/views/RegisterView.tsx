import { Link } from "react-router-dom";

export default function RegisterView() {
  return (
    <>
      <div className="">Register View</div>
      <nav>
        <Link to="/auth/login">No tienes una cuenta? Registrate</Link>
      </nav>
    </>
  );
}
