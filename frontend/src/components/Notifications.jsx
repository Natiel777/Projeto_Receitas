import { useEffect, useState } from "react";

function SolicitarNotificacao() {
  const [exibirAviso, setExibirAviso] = useState(false);

  useEffect(() => {
    const jaSolicitou = localStorage.getItem("notificacaoSolicitada");

    if ("Notification" in window) {
      if (
        Notification.permission === "default" &&
        !jaSolicitou
      ) {
        setExibirAviso(true);
      } else if (Notification.permission === "denied") {
        localStorage.setItem("notificacaoSolicitada", "true");
      }
    }
  }, []);

  const pedirPermissao = async () => {
    const permissao = await Notification.requestPermission();
    if (permissao === "granted") {
      new Notification("Permissão concedida! Você receberá notificações.");
    }
    localStorage.setItem("notificacaoSolicitada", "true");
    setExibirAviso(false);
  };

  const recusarPermissao = () => {
    localStorage.setItem("notificacaoSolicitada", "true");
    setExibirAviso(false);
  };

  if (!exibirAviso) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-sm bg-white border border-gray-300 shadow-lg rounded-lg p-4 z-[999999]">
      <p className="text-sm text-gray-800 mb-3">
        Deseja permitir que este site envie notificações para seu dispositivo?
      </p>
      <div className="flex justify-end gap-2">
        <button
          onClick={recusarPermissao}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
        >
          Agora não
        </button>
        <button
          onClick={pedirPermissao}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Permitir
        </button>
      </div>
    </div>
  );
}

export default SolicitarNotificacao;
