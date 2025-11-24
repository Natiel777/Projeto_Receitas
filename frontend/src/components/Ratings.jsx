import { FiEdit, FiTrash2, FiCheck, FiX, FiStar } from "react-icons/fi";

function Avaliacao({
  avaliacoes,
  usuario,
  editandoAvaliacao,
  setEditandoAvaliacao,
  nota,
  setNota,
  notaEditada,
  setNotaEditada,
  editarAvaliacao,
  excluirAvaliacao,
  renderEstrelas,
  enviarAvaliacao,
}) {
  const renderEstrelasInterativas = (valorAtual, setValor) => (
    <div className="inline-flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => setValor(i)}
          className={`text-2xl ${
            i <= valorAtual ? "text-yellow-500" : "text-gray-300"
          }`}
          aria-label={'Nota ${i}'}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold">Avaliações</h3>
      <ul className="list-disc pl-5 space-y-2">
        {avaliacoes.map((a) => {
          const nomeUsuario = a.usuario?.nome ?? "Usuário";

          return (
            <li key={a.id}>
              {editandoAvaliacao === a.id ? (
                <>
                  {renderEstrelasInterativas(notaEditada, setNotaEditada)}

                  <button
                    onClick={() => editarAvaliacao(a.id)}
                    className="ml-2 text-green-600 hover:text-green-700 transition"
                    title="Salvar"
                    aria-label="Salvar"
                  >
                    <FiCheck className="inline" />
                  </button>

                  <button
                    onClick={() => setEditandoAvaliacao(null)}
                    className="ml-2 text-gray-500 hover:text-red-600 transition"
                    title="Cancelar"
                    aria-label="Cancelar"
                  >
                    <FiX className="inline" />
                  </button>
                </>
              ) : (
                <>
                  {renderEstrelas(a.nota)} — {nomeUsuario}

                  {usuario && a.usuario_id === usuario.id && (
                    <span className="inline-flex items-center ml-2 gap-2">
                      <button
                        onClick={() => {
                          setEditandoAvaliacao(a.id);
                          setNotaEditada(a.nota);
                        }}
                        className="text-blue-500 hover:text-blue-600 transition"
                        title="Editar avaliação"
                        aria-label="Editar avaliação"
                      >
                        <FiEdit className="inline" />
                      </button>

                      <button
                        onClick={() => excluirAvaliacao(a.id)}
                        className="text-red-500 hover:text-red-600 transition"
                        title="Excluir avaliação"
                        aria-label="Excluir avaliação"
                      >
                        <FiTrash2 className="inline" />
                      </button>
                    </span>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>

      {usuario && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            enviarAvaliacao();
          }}
          className="mt-4 flex flex-wrap items-center gap-2"
        >
          <label className="block mb-1 w-full sm:w-auto">Sua avaliação:</label>

          {renderEstrelasInterativas(nota, setNota)}

          <button
            type="submit"
            className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white shadow-md transition"
            title="Enviar avaliação"
            aria-label="Enviar avaliação"
          >
            <FiStar className="inline" />
          </button>
        </form>
      )}
    </div>
  );
}

export default Avaliacao;