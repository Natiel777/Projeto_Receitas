import { useEffect, useState } from "react";
import { useAuth } from "../auth/Auth";
import { fetchAPI } from "../api/api";
import { Link, useNavigate } from "react-router-dom";

function Perfil() {
  const { autenticado, logout } = useAuth();
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!autenticado) {
      navigate("/login");
      return;
    }

    fetchAPI("usuarios/perfil")
      .then(setUsuario)
      .catch((err) => setErro(err.message));
  }, [autenticado]);

  const excluirConta = async () => {
    if (!confirm("Tem certeza que deseja excluir sua conta?")) return;
    try {
      await fetchAPI("usuarios/excluir", "DELETE");
      logout();
    } catch (err) {
      setErro(err.message);
    }
  };

  if (erro) return <p className="text-red-500">{erro}</p>;
  if (!usuario) return <p>Carregando...</p>;

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Perfil</h2>
      <p>
        <strong>Nome:</strong> {usuario.nome}
      </p>
      <p>
        <strong>Email:</strong> {usuario.email}
      </p>
      <div className="mt-4 space-x-2">
        <Link to="/editar-usuario" className="text-blue-500">
          Editar dados
        </Link>
        <button onClick={excluirConta} className="text-red-500">
          Excluir conta
        </button>
      </div>
    </div>
  );
}

export default Perfil;