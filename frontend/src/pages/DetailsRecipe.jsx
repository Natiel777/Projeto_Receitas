import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAPI } from "../services/api";
import { useAuth } from "../auth/Auth";
import Avaliacao from "../components/Ratings";
import Comentario from "../components/Comments";

function DetalhesReceita() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario, autenticado } = useAuth();

  const [receita, setReceita] = useState(null);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [nota, setNota] = useState(0);
  const [notaEditada, setNotaEditada] = useState(0);
  const [editandoAvaliacao, setEditandoAvaliacao] = useState(null);
  const [editandoComentario, setEditandoComentario] = useState(null);
  const [textoEditado, setTextoEditado] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [r, a, c] = await Promise.all([
          fetchAPI(`receitas/${id}`),
          fetchAPI(`avaliacoes/receita/${id}`),
          fetchAPI(`comentarios/receita/${id}`),
        ]);
        setReceita(r);
        setAvaliacoes(a);
        setComentarios(c);
      } catch (err) {
        setErro(err.message);
      }
    };
    carregarDados();
  }, [id]);

  const media = avaliacoes.length
    ? (avaliacoes.reduce((s, a) => s + a.nota, 0) / avaliacoes.length).toFixed(1)
    : "Sem avaliações";

  const renderEstrelas = (nota) => (
    <span className="inline-flex gap-1 text-yellow-500">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>{i <= nota ? "★" : "☆"}</span>
      ))}
    </span>
  );

  const enviarComentario = async (e) => {
    e.preventDefault();
    await fetchAPI("comentarios", "POST", {
      texto: novoComentario,
      receita_id: id,
    });
    setNovoComentario("");
    setComentarios(await fetchAPI(`comentarios/receita/${id}`));
  };

  const editarComentario = async (idComentario) => {
    await fetchAPI(`comentarios/${idComentario}`, "PUT", {
      texto: textoEditado,
    });
    setComentarios(await fetchAPI(`comentarios/receita/${id}`));
    setEditandoComentario(null);
  };

  const excluirComentario = async (idComentario) => {
    await fetchAPI(`comentarios/${idComentario}`, "DELETE");
    setComentarios(await fetchAPI(`comentarios/receita/${id}`));
  };

  const enviarAvaliacao = async () => {
    if (!nota) return;
    await fetchAPI("avaliacoes", "POST", { nota, receita_id: id });
    setAvaliacoes(await fetchAPI(`avaliacoes/receita/${id}`));
  };

  const editarAvaliacao = async (idAvaliacao) => {
    await fetchAPI(`avaliacoes/${idAvaliacao}`, "PUT", { nota: notaEditada });
    setAvaliacoes(await fetchAPI(`avaliacoes/receita/${id}`));
    setEditandoAvaliacao(null);
  };

  const excluirAvaliacao = async (idAvaliacao) => {
    await fetchAPI(`avaliacoes/${idAvaliacao}`, "DELETE");
    setAvaliacoes(await fetchAPI(`avaliacoes/receita/${id}`));
  };

  const excluirReceita = async () => {
    if (confirm("Tem certeza que deseja excluir esta receita?")) {
      await fetchAPI(`receitas/${id}`, "DELETE");
      navigate("/receitas");
    }
  };

  const formatarDescricao = (texto) => {
    const [ingredientes, preparo] = texto.split("Modo de Preparo:");
    return (
      <>
        <h3 className="text-lg font-semibold mt-4 mb-2">Ingredientes</h3>
        <ul className="list-disc list-inside mb-4">
          {ingredientes
            .replace("Ingredientes:", "")
            .split("\n")
            .filter(Boolean)
            .map((item, i) => (
              <li key={i}>{item.trim()}</li>
            ))}
        </ul>
        <h3 className="text-lg font-semibold mb-2">Modo de Preparo</h3>
        <ol className="list-decimal list-inside space-y-1">
          {preparo
            .split("\n")
            .filter(Boolean)
            .map((passo, i) => (
              <li key={i}>{passo.trim()}</li>
            ))}
        </ol>
      </>
    );
  };

  if (erro) return <p className="text-red-500">{erro}</p>;
  if (!receita) return <p>Carregando...</p>;

  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 font-sans">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 break-words">{receita.titulo}</h2>
      <p className="text-sm text-gray-700 mb-2 dark:text-gray-200">Categoria: {receita.categoria}</p>

      {usuario?.id === receita.usuario_id && (
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
          <button
            onClick={excluirReceita}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition"
          >
            Excluir Receita
          </button>
          <button
            onClick={() => navigate(`/receitas/editar/${receita.id}`)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition"
          >
            Editar Receita
          </button>
        </div>
      )}

      <img
        src={`http://localhost:3000/uploads/${receita.imagem}`}
        alt={receita.titulo}
        className="w-full max-w-full h-64 object-cover mb-6 rounded-xl shadow-lg"
      />

      {formatarDescricao(receita.descricao)}

      <p className="mt-6 mb-2 text-lg font-medium">
        Média: {media} {media !== "Sem avaliações" && renderEstrelas(Math.round(media))}
      </p>

      <Avaliacao
        avaliacoes={avaliacoes}
        usuario={usuario}
        nota={nota}
        setNota={setNota}
        notaEditada={notaEditada}
        setNotaEditada={setNotaEditada}
        editandoAvaliacao={editandoAvaliacao}
        setEditandoAvaliacao={setEditandoAvaliacao}
        editarAvaliacao={editarAvaliacao}
        excluirAvaliacao={excluirAvaliacao}
        renderEstrelas={renderEstrelas}
        enviarAvaliacao={enviarAvaliacao}
      />

      <Comentario
        comentarios={comentarios}
        usuario={usuario}
        editandoComentario={editandoComentario}
        setEditandoComentario={setEditandoComentario}
        textoEditado={textoEditado}
        setTextoEditado={setTextoEditado}
        editarComentario={editarComentario}
        excluirComentario={excluirComentario}
      />

      {autenticado && (
        <form onSubmit={enviarComentario} className="mt-6 space-y-4">
          <textarea
            className="w-full border rounded-xl p-3 shadow-sm bg-white text-black dark:bg-neutral-900 dark:text-white placeholder-gray-400 dark:placeholder-white focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
            placeholder="Escreva um comentário..."
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition"
          >
            Comentar
          </button>
        </form>
      )}
    </div>
  );
}

export default DetalhesReceita;