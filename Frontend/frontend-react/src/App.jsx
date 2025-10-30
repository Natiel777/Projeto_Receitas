import React, { useState } from "react";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  const [page, setPage] = useState("home"); // "home", "login", "signup"

  const renderPage = () => {
    if (page === "login") return <Login goHome={() => setPage("home")} goSignup={() => setPage("signup")} />;
    if (page === "signup") return <Signup goLogin={() => setPage("login")} />;
    return <Home goLogin={() => setPage("login")} goSignup={() => setPage("signup")} />;
  };

  return <div>{renderPage()}</div>;
}

export default App;