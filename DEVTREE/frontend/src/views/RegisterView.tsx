import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

export default function RegisterView() {
  return (
    <AuthLayout>
      <nav>
        <Link to="/auth/login">No tienes una cuenta? Registrate</Link>
      </nav>
    </AuthLayout>
  );
}
