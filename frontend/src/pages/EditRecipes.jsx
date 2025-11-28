import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAPI, fetchFormData } from "../services/api";

const CATEGORIAS_RECEITA = [
  "Aperitivos",
  "Acompanhamentos",
  "Assados",
  "Bebidas",
  "Bolos e Tortas",
  "Carnes",
  "Churrasco",
  "Comida de Rua",
  "Comida Internacional",
  "Confeitaria",
  "Conservas",
  "Doces e Sobremesas",
  "Entradas",
  "Lanches",
  "Massas",
  "Ovos e Laticínios",
  "Pães e Fermentados",
  "Peixes e Frutos do Mar",
  "Pratos de Inverno",
  "Pratos de Verão",
  "Pratos Principais",
  "Refeições Rápidas",
  "Saladas",
  "Sanduíches",
  "Sopas e Caldos",
  "Vegan",
  "Vegetariano",
];

function EditarReceita() {
  const { id } = useParams();
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [modoPreparo, setModoPreparo] = useState("");
  const [imagem, setImagem] = useState(null);
  // **CORREÇÃO: Adicionado estado para a URL da imagem atual**
  const [imagemAtualUrl, setImagemAtualUrl] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const extrairDescricao = (descricaoCompleta) => {
    const ingredientesRegex = /Ingredientes:\s*([\s\S]*?)\s*Modo de Preparo:/;
    const modoPreparoRegex = /Modo de Preparo:\s*([\s\S]*)/;

    const matchIngredientes = descricaoCompleta.match(ingredientesRegex);
    const matchModoPreparo = descricaoCompleta.match(modoPreparoRegex);

    return {
      ingredientes: matchIngredientes ? matchIngredientes[1].trim() : "",
      modoPreparo: matchModoPreparo ? matchModoPreparo[1].trim() : "",
    };
  };

  useEffect(() => {
    fetchAPI(`receitas/${id}`)
      .then((data) => {
        setTitulo(data.titulo);
        setCategoria(data.categoria || "");

        const { ingredientes, modoPreparo } = extrairDescricao(data.descricao);
        setIngredientes(ingredientes);
        setModoPreparo(modoPreparo);

        // **CORREÇÃO: Define a URL da imagem atual (Cloudinary)**
        // Se 'data.imagem' for o public_id do Cloudinary:
        const cloudinaryBaseUrl = "https://res.cloudinary.com/seu-cloud-name/image/upload/";
        const imagemUrl = data.imagem ? `${cloudinaryBaseUrl}w_600,h_400,c_fill/${data.imagem}` : '';
        setImagemAtualUrl(imagemUrl);
        
        // Se 'data.imagem' já for a URL completa do Cloudinary, use:
        // setImagemAtualUrl(data.imagem || '');

      })
      .catch((err) => setErro(err.message));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const descricaoFormatada = `
Ingredientes:
${ingredientes.trim()}

Modo de Preparo:
${modoPreparo.trim()}
    `.trim();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("categoria", categoria);
    formData.append("descricao", descricaoFormatada);
    if (imagem) formData.append("imagem", imagem);

    try {
      await fetchFormData(`receitas/${id}`, formData, "PUT");
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
        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-500 text-gray-900 dark:text-white placeholder-neutral-600 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        >
          <option value="">Selecione a Categoria</option>
          {CATEGORIAS_RECEITA.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Ingredientes (um por linha)"
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-500 text-gray-900 dark:text-white placeholder-neutral-600 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        <textarea
          placeholder="Modo de Preparo (passo a passo)"
          value={modoPreparo}
          onChange={(e) => setModoPreparo(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-500 text-gray-900 dark:text-white placeholder-neutral-600 dark:placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        
        {/* **CORREÇÃO: Adicionado a exibição da imagem atual do Cloudinary** */}
        {imagemAtualUrl && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2 dark:text-white">Imagem Atual:</p>
            <img 
              src={imagemAtualUrl} 
              alt="Imagem atual da receita" 
              className="w-full h-auto object-cover rounded-md max-h-48"
            />
          </div>
        )}

        <input
          label="Nova Imagem"
          type="file"
          onChange={(e) => setImagem(e.target.files[0])}
          className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-500 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
        />
        {erro && (
          <p className="text-red-600 dark:text-red-400 text-sm">{erro}</p>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-colors duration-300"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}

export default EditarReceita;
