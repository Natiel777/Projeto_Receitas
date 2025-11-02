import React from 'react';

export default function ReceitaCard({ receita, user, onAvaliar }) {
  const media = receita.media_avaliacao || 0;
  const estrelasCheias = Math.round(media);

  return (
    <div className="receita-card">
      <h3>{receita.titulo}</h3>
      {receita.imagem && <img src={`/uploads/${receita.imagem}`} alt={receita.titulo} />}
      <p><b>Ingredientes:</b> {receita.ingredientes}</p>
      <p><b>Modo:</b> {receita.modo_preparo}</p>
      <p><i>Autor: {receita.autor}</i></p>

      {/* Média de avaliação */}
      <div className="media-avaliacao">
        Média: {media.toFixed(1)} ⭐
        {' '}
        {[1,2,3,4,5].map(n => <span key={n}>{n <= estrelasCheias ? '★' : '☆'}</span>)}
      </div>

      {/* Avaliação clicável */}
      {user && (
        <div className="stars">
          {[1,2,3,4,5].map(n => (
            <span
              key={n}
              className="star"
              style={{ cursor: 'pointer' }}
              onClick={() => onAvaliar(receita.id, n)}
            >
              ★
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
