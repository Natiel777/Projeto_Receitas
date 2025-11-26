import { FiEdit, FiTrash2, FiCheck, FiX } from "react-icons/fi";

function Comentario({
  comentarios,
  usuario,
  editandoComentario,
  setEditandoComentario,
  textoEditado,
  setTextoEditado,
  editarComentario,
  excluirComentario,
}) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold">Comentários</h3>
      <ul className="list-disc pl-5 space-y-2">
        {comentarios.map((c) => (
          <li key={c.id}>
            {editandoComentario === c.id ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 dark: text-black">
                <input
                  type="text"
                  value={textoEditado}
                  onChange={(e) => setTextoEditado(e.target.value)}
                  className="border rounded p-2 w-full sm:w-auto flex-grow"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => editarComentario(c.id)}
                    className="text-green-600 hover:text-green-700"
                    title="Salvar"
                    aria-label="Salvar"
                  >
                    <FiCheck />
                  </button>
                  <button
                    onClick={() => setEditandoComentario(null)}
                    className="text-gray-400 hover:text-red-600"
                    title="Cancelar"
                    aria-label="Cancelar"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>
                  {c.texto} —{" "}
                  <span className="font-medium">{c.usuario.nome}</span>
                </span>
                {usuario && c.usuario_id === usuario.id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditandoComentario(c.id);
                        setTextoEditado(c.texto);
                      }}
                      className="text-blue-500 hover:text-blue-600"
                      title="Editar comentário"
                      aria-label="Editar comentário"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => excluirComentario(c.id)}
                      className="text-red-500 hover:text-red-600"
                      title="Excluir comentário"
                      aria-label="Excluir comentário"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comentario;