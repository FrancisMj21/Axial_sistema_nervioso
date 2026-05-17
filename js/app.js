(() => {
  window.addEventListener("DOMContentLoaded", () => {
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebarScrim = document.getElementById("sidebarScrim");
    const sidebar = document.getElementById("sidebar");
    const themeToggle = document.getElementById("themeToggle");
    const mobileQuery = window.matchMedia("(max-width: 900px)");

    function setSidebar(open){
      if (mobileQuery.matches) {
        sidebar?.classList.toggle("is-open", open);
        document.body.classList.toggle("sidebar-open", open);
        document.body.classList.remove("sidebar-collapsed");
      } else {
        sidebar?.classList.remove("is-open");
        document.body.classList.remove("sidebar-open");
        document.body.classList.toggle("sidebar-collapsed", !open);
      }
      sidebarToggle?.setAttribute("aria-expanded", String(open));
      sidebarToggle?.setAttribute("aria-label", open ? "Cerrar menu" : "Abrir menu");
    }

    function setContrast(active){
      document.body.classList.toggle("high-contrast", active);
      themeToggle?.classList.toggle("is-active", active);
      themeToggle?.setAttribute("aria-pressed", String(active));
      themeToggle?.setAttribute("aria-label", active ? "Desactivar alto contraste" : "Activar alto contraste");
      try {
        localStorage.setItem("atlasHighContrast", active ? "1" : "0");
      } catch (error) {
        /* Storage can be unavailable in private contexts. */
      }
    }

    sidebarToggle?.addEventListener("click", () => {
      const open = mobileQuery.matches
        ? sidebar?.classList.contains("is-open")
        : !document.body.classList.contains("sidebar-collapsed");
      setSidebar(!open);
    });

    sidebarScrim?.addEventListener("click", () => setSidebar(false));

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") setSidebar(false);
    });

    setSidebar(!mobileQuery.matches);

    let savedContrast = false;
    try {
      savedContrast = localStorage.getItem("atlasHighContrast") === "1";
    } catch (error) {
      savedContrast = false;
    }
    setContrast(savedContrast);

    themeToggle?.addEventListener("click", () => {
      setContrast(!document.body.classList.contains("high-contrast"));
    });

    mobileQuery.addEventListener("change", () => {
      setSidebar(!mobileQuery.matches);
    });
  });
})();
