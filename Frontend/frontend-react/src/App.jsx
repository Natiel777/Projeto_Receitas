import React, { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Cadastro";

function App() {
  const [page, setPage] = useState("home"); // "home", "login", "cadastro"

  const renderPage = () => {
    if (page === "Login") return <Login goHome={() => setPage("home")} goCadastro={() => setPage("Cadastro")} />;
    if (page === "Cadastro") return <Cadastro goLogin={() => setPage("Login")} />;
    return <Home goLogin={() => setPage("Login")} goCadastro={() => setPage("Cadastro")} />;
  };

  return <div>{renderPage()}</div>;
}

export default App;