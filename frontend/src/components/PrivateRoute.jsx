import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/Auth";

function PrivateRoute() {
  const { autenticado, carregando } = useAuth();

  if (carregando) {
    return <p>Verificando login...</p>;
  }

  return autenticado ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
