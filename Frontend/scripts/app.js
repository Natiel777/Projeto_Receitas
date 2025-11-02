import { apiPost, apiPut, apiDelete } from './api.js';

// CADASTRO
const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
  formCadastro.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formCadastro));
    const res = await apiPost('/usuario/cadastrar', data);
    alert('Cadastro realizado!');
    window.location.href = 'login.html';
  });
}

// LOGIN
const formLogin = document.getElementById('form-login');
if (formLogin) {
  formLogin.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formLogin));
    const res = await apiPost('/usuario/login', data);
    if (res.erro) return alert(res.erro);
    window.location.href = 'index.html';
  });
}

// LOGOUT
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    await apiPost('/usuario/logout', {});
    window.location.href = 'login.html';
  });
}

// PUBLICAR
const formPublicar = document.getElementById('form-publicar');
if (formPublicar) {
  formPublicar.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(formPublicar);
    const res = await apiPost('/receitas/publicar', formData, true);
    alert('Receita publicada!');
    window.location.href = 'index.html';
  });
}

// EDITAR PERFIL
const formEditar = document.getElementById('form-editar');
if (formEditar) {
  formEditar.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formEditar));
    const res = await apiPut('/usuario/editar', data);
    alert('Dados atualizados!');
  });
}

// EXCLUIR CONTA
const btnExcluirConta = document.getElementById('btn-excluir-conta');
if (btnExcluirConta) {
  btnExcluirConta.addEventListener('click', async () => {
    if (confirm('Tem certeza que deseja excluir sua conta?')) {
      await apiDelete('/usuario/excluir');
      alert('Conta excluída');
      window.location.href = 'cadastro.html';
    }
  });
}