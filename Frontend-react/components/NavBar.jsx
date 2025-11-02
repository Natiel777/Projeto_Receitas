import React from 'react';

export default function NavBar({ user }) {
  return (
    <nav className="navbar">
      <a href="/">Início</a>
      {user && user.id ? (
        <>
          <span>Olá, {user.nome}!</span>
          <a href="/publicar">Publicar</a>
          <a href="/perfil">Perfil</a>
        </>
      ) : (
        <>
          <a href="/cadastro">Cadastro</a>
          <a href="/login">Entrar</a>
        </>
      )}
    </nav>
  );
}
