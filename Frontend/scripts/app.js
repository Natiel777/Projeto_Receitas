import { apiPost, apiPut, apiDelete, apiGet } from './api.js';
import { carregarReceitas, carregarMinhasReceitas, renderNavFromLocal } from './ui.js';

async function getUser() {
  let local = null;
  try { local = JSON.parse(localStorage.getItem('usuario')); } catch {}
  if (local) return local;
  const res = await apiGet('/usuario/logado');
  if (res && res.id) {
    localStorage.setItem('usuario', JSON.stringify(res));
    return res;
  }
  return null;
}

async function renderNav() {
  const user = await getUser();
  renderNavFromLocal(user);
}

// Inicializa navegação
renderNav();

// CADASTRO
const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
  formCadastro.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formCadastro));
    const res = await apiPost('/usuario/cadastrar', data);
    if (res.id) {
      alert('Cadastro realizado! Faça login.');
      window.location.href = 'login.html';
    } else alert(res.erro || 'Erro no cadastro');
  });
}

// LOGIN
const formLogin = document.getElementById('form-login');
if (formLogin) {
  formLogin.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formLogin));
    const res = await apiPost('/usuario/login', data);
    if (res.id) {
      localStorage.setItem('usuario', JSON.stringify(res));
      alert('Login efetuado!');
      window.location.href = 'index.html';
    } else alert(res.erro || 'Erro ao logar');
  });
}

// LOGOUT
document.addEventListener('click', e => {
  if (e.target && e.target.id === 'logout-btn') {
    apiPost('/usuario/logout', {});
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
  }
});

// PUBLICAR
const formPublicar = document.getElementById('form-publicar');
if (formPublicar) {
  formPublicar.addEventListener('submit', async e => {
    e.preventDefault();
    const user = await getUser();
    if (!user) {
      const go = confirm('É preciso login. OK=Entrar, Cancel=Cadastrar');
      window.location.href = go ? 'login.html' : 'cadastro.html';
      return;
    }
    const formData = new FormData(formPublicar);
    const titulo = formData.get('titulo')?.trim();
    const ingredientes = formData.get('ingredientes')?.trim();
    const imagem = formData.get('imagem');
    if (!titulo || !ingredientes || !imagem || imagem.size === 0) {
      alert('Título, ingredientes e imagem obrigatórios!');
      return;
    }
    const res = await apiPost('/receitas/publicar', formData, true);
    if (res.id) {
      alert('Receita publicada!');
      window.location.href = 'index.html';
    } else alert(res.erro || 'Erro ao publicar');
  });
}

// PERFIL: editar e excluir
const formEditar = document.getElementById('form-editar');
if (formEditar) {
  getUser().then(user => {
    if (user) {
      document.getElementById('perfil-nome').textContent = user.nome;
      document.getElementById('perfil-email').textContent = user.email;
      formEditar.querySelector('input[name="nome"]').placeholder = user.nome;
      formEditar.querySelector('input[name="email"]').placeholder = user.email;
    }
  });

  formEditar.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formEditar));
    const res = await apiPut('/usuario/editar', data);
    if (res.id) {
      localStorage.setItem('usuario', JSON.stringify(res));
      alert('Dados atualizados!');
      window.location.reload();
    } else alert(res.erro || 'Erro ao atualizar');
  });
}

const btnExcluirConta = document.getElementById('btn-excluir-conta');
if (btnExcluirConta) {
  btnExcluirConta.addEventListener('click', async () => {
    if (!confirm('Excluir conta definitivamente?')) return;
    const res = await apiDelete('/usuario/excluir');
    if (res.msg) {
      localStorage.removeItem('usuario');
      alert('Conta excluída.');
      window.location.href = 'cadastro.html';
    } else alert(res.erro || 'Erro ao excluir');
  });
}

// Inicializações de páginas
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/')
  carregarReceitas();
if (window.location.pathname.endsWith('perfil.html'))
  carregarMinhasReceitas();