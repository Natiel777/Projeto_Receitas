import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import SolicitarNotificacao from "./components/SolicitarNotificacao";
import CookieBanner from "./components/CookieBanner";

import Inicio from "./pages/Inicio";
import ListarReceitas from "./pages/ListarReceitas";
import DetalhesReceita from "./pages/DetalhesReceita";
import Sobre from "./pages/Sobre";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";

import CriarReceita from "./pages/CriarReceita";
import EditarReceita from "./pages/EditarReceita";
import Perfil from "./pages/Perfil";
import EditarUsuario from "./pages/EditarUsuario";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-800 text-black dark:text-gray-100 transition-colors duration-100">
      <NavBar />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/receitas" element={<ListarReceitas />} />
          <Route path="/receitas/:id" element={<DetalhesReceita />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route element={<PrivateRoute />}>
            <Route path="/criar" element={<CriarReceita />} />
            <Route path="/receitas/editar/:id" element={<EditarReceita />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/editar-usuario" element={<EditarUsuario />} />
          </Route>
        </Routes>
      </main>
      <CookieBanner />
      <SolicitarNotificacao />
      <ScrollToTop />
    </div>
  );
}

export default App;