import { useEffect } from "react";

export default function UI() {

  useEffect(() => {
    const handleFormSubmit = (e) => {
      if (e.target.tagName === "FORM") e.preventDefault();
    };
    document.addEventListener("submit", handleFormSubmit);
    return () => document.removeEventListener("submit", handleFormSubmit);
  }, []);

  useEffect(() => {
    const debounce = (fn, delay) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
      };
    };

    const handleResize = debounce(() => {
      console.log("Janela redimensionada");
    }, 300);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Delay automático executado");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      console.log("DOM atualizado");
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMobileAdjustments = () => {
      const html = document.documentElement;
      const w = window.innerWidth;

      if (w < 640) {
        html.style.fontSize = "14px";
        html.style.setProperty("--container-padding", "1rem");
      } else {
        html.style.fontSize = "16px";
        html.style.setProperty("--container-padding", "1.5rem");
      }
    };

    handleMobileAdjustments();
    window.addEventListener("resize", handleMobileAdjustments);
    return () => window.removeEventListener("resize", handleMobileAdjustments);
  }, []);

  return null;
}
