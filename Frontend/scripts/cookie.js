if (!localStorage.getItem("cookiesAccepted")) {
  const banner = document.createElement("div");
  banner.innerHTML = `
    <div style="position:fixed;bottom:0;left:0;right:0;background:#222;color:white;padding:10px;text-align:center;z-index:1000;">
      Este site usa cookies para melhorar sua experiência.
      <button id="acceptCookies">Aceitar</button>
    </div>`;
  document.body.appendChild(banner);
  document.getElementById("acceptCookies").onclick = () => {
    localStorage.setItem("cookiesAccepted", "true");
    banner.remove();
  };
}