import React, { useState } from "react";
import IndexPage from "./index";
import Login from "./Login";
import Cadastro from "./Cadastro";

function App() {
  const [page, setPage] = useState("home"); // "home", "login", "cadastro"

  const renderPage = () => {
    if (page === "login") return <Login goHome={() => setPage("home")} goCadastro={() => setPage("cadastro")} />;
    if (page === "cadastro") return <Cadastro goLogin={() => setPage("login")} />;
    return <IndexPage goLogin={() => setPage("login")} goCadastro={() => setPage("cadastro")} />;
  };

  return <div>{renderPage()}</div>;
}

export default App;