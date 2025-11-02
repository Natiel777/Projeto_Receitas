import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import ReceitaList from '../components/ReceitaList';
import { apiGet, apiPost } from '../api';

export default function Home() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('usuario') || 'null'));
  const [receitas, setReceitas] = useState([]);

  const carregarReceitas = async () => {
    const data = await apiGet('/receitas');
    setReceitas(data);
  };

  const avaliarReceita = async (id, nota) => {
    const res = await apiPost(`/avaliar/${id}`, { nota });
    if (res.msg) {
      alert(`Você avaliou com ${nota}⭐`);
      carregarReceitas();
    }
  };

  useEffect(() => { carregarReceitas(); }, []);

  return (
    <div>
      <NavBar user={user} />
      <main>
        <ReceitaList receitas={receitas} user={user} onAvaliar={avaliarReceita} />
      </main>
    </div>
  );
}
