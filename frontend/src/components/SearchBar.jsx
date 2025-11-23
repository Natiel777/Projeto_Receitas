import { useState } from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const termo = query.trim();
    if (termo) onSearch(termo);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Pesquisar receitas..."
          aria-label="Pesquisar receitas"
          className="w-full pr-10 pl-4 py-2 rounded-full shadow bg-white dark:bg-neutral-700 text-black dark:text-gray-100 placeholder-gray-400 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-400 dark:hover:text-orange-600 transition"
          aria-label="Buscar"
        >
          <FiSearch size={20} />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;