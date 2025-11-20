import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Auth";
import { Input, TextArea, Botao } from "../ui/ui";

function EditarReceita() {
  const { id } = useParams();
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState(null);
  const [erro, setErro] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/api/receitas/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitulo(data.titulo);
        setDescricao(data.descricao);
        setCategoria(data.categoria || "");
      })
      .catch((err) => setErro(err.message));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("categoria", categoria);
    if (imagem) formData.append("imagem", imagem);

    try {
      const response = await fetch(`http://localhost:3000/api/receitas/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.erro);
      navigate(`/receitas/${id}`);
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-6 py-8 rounded-lg shadow-lg bg-white dark:bg-neutral-700 text-gray-800 dark:text-gray-100 transition-colors duration-500 font-sans">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors">
        Editar Receita
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        <Input
          label="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-500 text-gray-900 dark:text-white placeholder-neutral-600 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        <TextArea
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-500 text-gray-900 dark:text-white placeholder-neutral-600 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        <Input
          label="Nova Imagem"
          type="file"
          onChange={(e) => setImagem(e.target.files[0])}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        {erro && (
          <p className="text-red-600 dark:text-red-400 text-sm">{erro}</p>
        )}
        <Botao
          type="submit"
          className="w-full py-2 px-4 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-colors duration-300"
        >
          Salvar Alterações
        </Botao>
      </form>
    </div>
  );
}

export default EditarReceita;
