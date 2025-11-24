import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import UI from "./utils/ui";
import ScrollToTop from "./components/ScrollToTop";
import SolicitarNotificacao from "./components/Notifications";
import CookieBanner from "./components/CookieBanner";
import Footer from "./components/Footer";

import Inicio from "./pages/Home";
import ListarReceitas from "./pages/ListRecipes";
import DetalhesReceita from "./pages/DetailsRecipe";
import Sobre from "./pages/About";
import Login from "./pages/Login";
import Registrar from "./pages/Register";

import CriarReceita from "./pages/CreateRecipe";
import EditarReceita from "./pages/EditRecipes";
import Perfil from "./pages/Profile";
import EditarUsuario from "./pages/EditUser";
import EsqueciSenha from "./pages/ForgotPassword";
import ResetarSenha from "./pages/ResetUser"
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-800 text-black dark:text-gray-100 transition-colors duration-100">
      <UI />
      <NavBar />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/receitas" element={<ListarReceitas />} />
          <Route path="/receitas/:id" element={<DetalhesReceita />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/forgot-password" element={<EsqueciSenha />} />

          <Route element={<PrivateRoute />}>
            <Route path="/criar" element={<CriarReceita />} />
            <Route path="/receitas/editar/:id" element={<EditarReceita />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/editar-usuario" element={<EditarUsuario />} />
            <Route path="/resetar-senha" element={<ResetarSenha />} />
          </Route>
        </Routes>
      </main>
      <CookieBanner />
      <SolicitarNotificacao />
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;