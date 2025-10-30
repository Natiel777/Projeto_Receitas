import React from "react";

function RecipeCard({ receita }) {
  return (
    <div className="recipe-card">
      <h2>{receita.nome}</h2>
      <p>{receita.descricao}</p>
    </div>
  );
}

export default RecipeCard;