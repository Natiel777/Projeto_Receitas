import { useEffect, useState } from "react";

function CookieBanner() {
  const [visivel, setVisivel] = useState(false);

  const getCookie = (nome) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + nome + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  const setCookie = (nome, valor, dias) => {
    const expira = new Date();
    expira.setTime(expira.getTime() + dias * 24 * 60 * 60 * 1000);
    document.cookie = `${nome}=${valor}; expires=${expira.toUTCString()}; path=/; SameSite=Strict`;
  };

  useEffect(() => {
    const consentimento = getCookie("cookieConsent");
    if (!consentimento) {
      setVisivel(true);
    }
  }, []);

  const aceitar = () => {
    setCookie("cookieConsent", "aceito", 365);
    setVisivel(false);
  };

  const recusar = () => {
    setCookie("cookieConsent", "recusado", 365);
    setVisivel(false);
  };

  if (!visivel) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-700 text-white text-sm px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4 z-100">
      <span>Este site utiliza cookies para melhorar sua experiência.</span>
      <div className="flex gap-2">
        <button
          onClick={aceitar}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded"
        >
          Aceitar
        </button>
        <button
          onClick={recusar}
          className="bg-red-700 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
        >
          Recusar
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;