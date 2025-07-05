import { Link } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

export default function LoginView() {
  return (
    <AuthLayout>
      <nav>
        <Link to="/auth/register">Ya tienes una cuenta? Inicia Sesión</Link>
      </nav>
    </AuthLayout>
  );
}
