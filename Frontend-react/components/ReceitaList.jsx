import React from 'react';
import ReceitaCard from './ReceitaCard';

export default function ReceitaList({ receitas, user, onAvaliar }) {
  if (!receitas.length) return <p>Nenhuma receita publicada.</p>;

  return (
    <div className="receitas-container">
      {receitas.map(r => (
        <ReceitaCard key={r.id} receita={r} user={user} onAvaliar={onAvaliar} />
      ))}
    </div>
  );
}
