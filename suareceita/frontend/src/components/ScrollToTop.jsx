function ScrollToTop() {
  const subir = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      onClick={subir}
      aria-label="Voltar ao topo"
      className="fixed bottom-6 right-6 z-50 bg-orange-700 text-white p-4 rounded-full shadow-xl 
                 hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-gray-500 
                 transition transform hover:scale-110"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

export default ScrollToTop;
