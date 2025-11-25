import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAPI } from "../services/api";
import { useAuth } from "../auth/Auth";
import Avaliacao from "../components/Ratings";
import Comentario from "../components/Comments";
import { Facebook, Twitter, Send, Instagram, Link, X } from "lucide-react";

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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
        setErro("Não foi possível carregar os detalhes da receita.");
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
    if (!novoComentario.trim()) return;
    try {
        await fetchAPI("comentarios", "POST", {
          texto: novoComentario,
          receita_id: id,
        });
        setNovoComentario("");
        setComentarios(await fetchAPI(`comentarios/receita/${id}`));
    } catch (err) {
        setErro("Erro ao enviar comentário.");
    }
  };

  const editarComentario = async (idComentario) => {
    if (!textoEditado.trim()) return;
    try {
        await fetchAPI(`comentarios/${idComentario}`, "PUT", {
          texto: textoEditado,
        });
        setComentarios(await fetchAPI(`comentarios/receita/${id}`));
        setEditandoComentario(null);
    } catch (err) {
        setErro("Erro ao editar comentário.");
    }
  };

  const excluirComentario = async (idComentario) => {
    try {
        await fetchAPI(`comentarios/${idComentario}`, "DELETE");
        setComentarios(await fetchAPI(`comentarios/receita/${id}`));
    } catch (err) {
        setErro("Erro ao excluir comentário.");
    }
  };

  const enviarAvaliacao = async () => {
    if (!nota || nota < 1 || nota > 5) return;
    try {
        await fetchAPI("avaliacoes", "POST", { nota, receita_id: id });
        setAvaliacoes(await fetchAPI(`avaliacoes/receita/${id}`));
    } catch (err) {
        setErro("Erro ao enviar avaliação. Você já avaliou esta receita?");
    }
  };

  const editarAvaliacao = async (idAvaliacao) => {
    if (!notaEditada || notaEditada < 1 || notaEditada > 5) return;
    try {
        await fetchAPI(`avaliacoes/${idAvaliacao}`, "PUT", { nota: notaEditada });
        setAvaliacoes(await fetchAPI(`avaliacoes/receita/${id}`));
        setEditandoAvaliacao(null);
    } catch (err) {
        setErro("Erro ao editar avaliação.");
    }
  };

  const excluirAvaliacao = async (idAvaliacao) => {
    try {
        await fetchAPI(`avaliacoes/${idAvaliacao}`, "DELETE");
        setAvaliacoes(await fetchAPI(`avaliacoes/receita/${id}`));
    } catch (err) {
        setErro("Erro ao excluir avaliação.");
    }
  };

  const handleConfirmDelete = async () => {
    setShowDeleteConfirm(false);
    try {
        await fetchAPI(`receitas/${id}`, "DELETE");
        navigate("/receitas");
    } catch (err) {
        setErro("Erro ao excluir receita.");
    }
  };

  const excluirReceita = () => {
    setShowDeleteConfirm(true);
  };

  const formatarDescricao = (texto) => {
    if (!texto || typeof texto !== 'string') return null;

    const preparoMarker = texto.includes("Modo de Preparo:") ? "Modo de Preparo:" : (texto.includes("Modo de preparo:") ? "Modo de preparo:" : null);
    
    let ingredientes = texto;
    let preparo = "";

    if (preparoMarker) {
        [ingredientes, preparo] = texto.split(preparoMarker);
    } else {
        console.warn("Marcador 'Modo de Preparo:' não encontrado. Exibindo como texto corrido.");
        return <p className="whitespace-pre-wrap">{texto}</p>;
    }


    const formatList = (content, type) => {
        const lines = content.replace(type === 'ingredientes' ? /Ingredientes:|Ingredientes:\n/i : /Modo de Preparo:|Modo de preparo:/i, "")
                            .trim()
                            .split('\n')
                            .filter(Boolean)
                            .map(line => line.trim());
        
        if (lines.length === 0) return <p className="text-gray-500 italic">Nenhuma informação de {type} disponível.</p>;

        const ListComponent = type === 'ingredientes' ? 'ul' : 'ol';
        const listStyle = type === 'ingredientes' ? 'list-disc' : 'list-decimal';

        return (
            <ListComponent className={`${listStyle} list-inside space-y-1 ml-5`}>
                {lines.map((item, i) => (
                    <li key={i} className="text-gray-800 dark:text-gray-300">{item.replace(/^-\s*/, '').replace(/^\d+\.\s*/, '')}</li>
                ))}
            </ListComponent>
        );
    }

    return (
      <>
        <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">Ingredientes</h3>
        {formatList(ingredientes, 'ingredientes')}

        <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">Modo de Preparo</h3>
        {formatList(preparo, 'preparo')}
      </>
    );
  };

  if (erro) return <p className="text-red-500 font-medium p-4 rounded-lg bg-red-100 dark:bg-red-900 dark:text-red-300 mx-auto max-w-3xl mt-10">{erro}</p>;
  if (!receita) return <p className="text-center mt-10 text-lg dark:text-white">Carregando...</p>;

  const currentUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(`Confira esta deliciosa receita: ${receita.titulo}`);
  const shareTextWhatsapp = encodeURIComponent(`${receita.titulo}\n${window.location.href}`);

  const SocialShare = () => (
    <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Compartilhe esta receita!</h3>
        <div className="flex gap-4 items-center">
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Compartilhar no Facebook"
                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition shadow-md hover:shadow-lg transform hover:scale-105"
            >
                <Facebook size={20} />
            </a>

            <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Compartilhar no X"
                className="p-3 bg-gray-900 hover:bg-black text-white rounded-full transition shadow-md hover:shadow-lg transform hover:scale-105 dark:bg-white dark:text-black"
            >
                <X size={20} />
            </a>

            <a
                href={`https://wa.me/?text=${shareTextWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Compartilhar no WhatsApp"
                className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full transition shadow-md hover:shadow-lg transform hover:scale-105"
            >
                <Send size={20} />
            </a>

            <button
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href).then(() => {
                        alert("Link copiado! Você pode colá-lo em suas Stories ou Directs do Instagram.");
                    }).catch(() => {
                        const el = document.createElement('textarea');
                        el.value = window.location.href;
                        document.body.appendChild(el);
                        el.select();
                        document.execCommand('copy');
                        document.body.removeChild(el);
                    });
                }}
                title="Copiar Link para Instagram"
                className="p-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition shadow-md hover:shadow-lg transform hover:scale-105"
            >
                <Instagram size={20} />
            </button>
        </div>
    </div>
  );


  const DeleteConfirmationModal = () => {
    if (!showDeleteConfirm) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl max-w-sm w-full m-4 border-t-4 border-red-500">
          <h3 className="text-xl font-bold mb-4 text-red-500">Confirmação de Exclusão</h3>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Tem certeza que deseja excluir a receita **{receita.titulo}**? Esta ação não pode ser desfeita.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteConfirm(false)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition shadow-red-500/50"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 font-sans dark:bg-neutral-900">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 break-words text-gray-900 dark:text-white">{receita.titulo}</h1>
      <p className="text-sm text-gray-700 mb-4 dark:text-gray-300">
        <span className="font-semibold">Categoria:</span> {receita.categoria}
      </p>

      {usuario?.id === receita.usuario_id && (
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-8">
          <button
            onClick={excluirReceita}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition shadow-md"
          >
            Excluir Receita
          </button>
          <button
            onClick={() => navigate(`/receitas/editar/${receita.id}`)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition shadow-md"
          >
            Editar Receita
          </button>
        </div>
      )}

      <img
        src={`http://localhost:3000/uploads/${receita.imagem}`}
        alt={receita.titulo}
        className="w-full max-w-full h-72 object-cover mb-8 rounded-xl shadow-xl border-4 border-white dark:border-gray-800"
        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/800x400/1D4ED8/ffffff?text=Imagem+da+Receita"; }}
      />

      <div className="bg-white dark:bg-gray-800 p-5 sm:p-8 rounded-xl shadow-lg">
          {formatarDescricao(receita.descricao)}
      </div>

      <p className="mt-8 mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Avaliação Média: <span className="text-blue-600">{media}</span> {media !== "Sem avaliações" && renderEstrelas(Math.round(media))}
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

      <SocialShare />
      
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
            className="w-full border-2 border-gray-300 dark:border-gray-700 rounded-xl p-3 shadow-inner bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y min-h-[100px]"
            placeholder="Escreva um comentário..."
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-base font-medium transition shadow-md"
            disabled={!novoComentario.trim()}
          >
            Comentar
          </button>
        </form>
      )}

      <DeleteConfirmationModal />
    </div>
  );
}

export default DetalhesReceita;