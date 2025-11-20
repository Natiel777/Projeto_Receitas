import React from "react";

const Sobre = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-100 transition-colors duration-500">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">
        Sobre Nós
      </h1>
      <p className="mb-4">
        Bem-vindo ao{" "}
        <span className="font-semibold text-orange-600 dark:text-orange-400 transition-colors">
          Receitas Online
        </span>
        , seu destino online para descobrir, compartilhar e se apaixonar por
        receitas deliciosas!
      </p>
      <p className="mb-4">
        Nosso objetivo é tornar a culinária acessível e divertida para todos —
        seja você um chef experiente ou alguém que está começando agora.
      </p>
      <p className="mb-4">
        Aqui você encontrará receitas testadas, dicas práticas e histórias que
        conectam sabores e memórias. Acreditamos que cozinhar é uma forma de
        expressão, de carinho e de cultura.
      </p>
      <p className="mb-4">
        Explore nosso acervo, experimente novas receitas e compartilhe suas
        criações com a comunidade. Juntos, vamos transformar ingredientes
        simples em momentos inesquecíveis.
      </p>
      <p className="italic text-gray-600 dark:text-gray-400 mt-6 transition-colors">
        Receitas que alimentam o corpo e o coração.
      </p>
    </div>
  );
};

export default Sobre;