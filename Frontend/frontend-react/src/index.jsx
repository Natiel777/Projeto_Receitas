import React, { useState } from "react";
import RecipeCard from "./RecipeCard";

function Home({ goLogin, goSignup }) {
  const [receitas] = useState([
    { id: 1, nome: "Bolo de Chocolate", descricao: "Delicioso e fofinho" },
    { id: 2, nome: "Salada Caesar", descricao: "Refrescante e saudável" },
    { id: 3, nome: "Macarrão ao molho pesto", descricao: "Rápido e saboroso" },
  ]);

  return (
    <main>
      <h1>Receitas Online</h1>
      <button onClick={goLogin}>Login</button>
      <button onClick={goSignup}>Cadastro</button>
      <div className="recipe-list">
        {receitas.map((r) => (
          <RecipeCard key={r.id} receita={r} />
        ))}
      </div>
    </main>
  );
}

export default Home;