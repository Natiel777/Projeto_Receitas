import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAPI } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const perfil = await fetchAPI("usuarios/perfil");
        setUsuario(perfil);
        setAutenticado(true);
      } catch {
        setUsuario(null);
        setAutenticado(false);
      } finally {
        setCarregando(false);
      }
    };
    verificarLogin();
  }, []);

  const login = async () => {
    try {
      const perfil = await fetchAPI("usuarios/perfil");
      setUsuario(perfil);
      setAutenticado(true);
      navigate("/");
    } catch {
      setUsuario(null);
      setAutenticado(false);
    }
  };

  const logout = async () => {
    try {
      await fetchAPI("usuarios/logout", "POST");
    } catch {}
    setUsuario(null);
    setAutenticado(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ usuario, autenticado, carregando, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);