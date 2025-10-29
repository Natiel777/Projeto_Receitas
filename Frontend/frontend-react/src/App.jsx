import { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import Lista from "./components/Lista";
import "./App.css";

function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/usuarios")
      .then(res => res.json())
      .then(setUsuarios);
  }, []);

  return (
    <div className="container">
      <h1>Receitas - React</h1>
      <Formulario setUsuarios={setUsuarios} />
      <Lista usuarios={usuarios} />
    </div>
  );
}

export default App;
