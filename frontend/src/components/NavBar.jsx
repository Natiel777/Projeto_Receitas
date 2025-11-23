import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/Auth";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.jpg";

function NavBar() {
  const { autenticado, logout } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);
  const [tema, setTema] = useState(
    () => localStorage.getItem("tema") || "light"
  );
  const menuRef = useRef();

  useEffect(() => {
    document.documentElement.classList.add(tema);
  }, []);

  useEffect(() => {
    const handleClickFora = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAberto(false);
      }
    };
    if (menuAberto) {
      document.addEventListener("mousedown", handleClickFora);
    } else {
      document.removeEventListener("mousedown", handleClickFora);
    }
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, [menuAberto]);

  const alternarTema = () => {
    const novoTema = tema === "light" ? "dark" : "light";
    document.documentElement.classList.remove(tema);
    document.documentElement.classList.add(novoTema);
    localStorage.setItem("tema", novoTema);
    setTema(novoTema);
  };

  const linksComuns = [
    { to: "/", label: "Início" },
    { to: "/receitas", label: "Receitas" },
    { to: "/sobre", label: "Sobre" },
  ];

  const linksPrivados = autenticado
    ? [
        { to: "/criar", label: "Nova Receita" },
        { to: "/perfil", label: "Perfil" },
        { label: "Sair", action: logout, isButton: true },
      ]
    : [
        { to: "/login", label: "Entrar" },
        { to: "/registrar", label: "Registrar" },
      ];

  const renderLinks = () => (
    <ul className="space-y-2 text-base font-medium text-black-900 dark:text-gray-100">
      {[...linksComuns, ...linksPrivados].map(
        ({ to, label, action, isButton }, i) =>
          isButton ? (
            <li key={i}>
              <button
                onClick={() => {
                  action();
                  setMenuAberto(false);
                }}
                className="block w-full text-left text-red-500 hover:text-red-700"
              >
                {label}
              </button>
            </li>
          ) : (
            <li key={i}>
              <Link
                to={to}
                onClick={() => setMenuAberto(false)}
                className="block hover:text-orange-400"
              >
                {label}
              </Link>
            </li>
          )
      )}
      <li>
        <button
          onClick={alternarTema}
          className="flex items-center gap-2 mt-2 w-full text-left p-2 bg-gray-50 dark:bg-neutral-800 rounded hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
        >
          {tema === "light" ? <FiMoon /> : <FiSun />}
          {tema === "light" ? "Modo Escuro" : "Modo Claro"}
        </button>
      </li>
    </ul>
  );

  return (
    <nav className="bg-white dark:bg-neutral-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-wide"
        >
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          Sua Receita
        </Link>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="text-xl p-2 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 transition"
            aria-label="Abrir menu"
          >
            {menuAberto ? <FiX /> : <FiMenu />}
          </button>

          {menuAberto && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-4 z-20">
              {renderLinks()}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
