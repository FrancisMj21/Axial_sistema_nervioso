(() => {
  function titleFor(section){
    const titles = {
      inicio: ["Atlas Interactivo", "Sistema nervioso axial y glosario"],
      orientacion: ["I. Orientacion anatomica", "Vistas anterior, posterior, lateral, dorsal y ventral"],
      planos: ["II. Planos neuroanatomicos", "Exploracion axial del encefalo"],
      estructuras: ["III. Estructuras cerebrales", "Lobulos, cortezas y nucleos profundos"],
      medula: ["IV. Medula espinal", "Conexion entre encefalo, cuerpo y nervios"],
      nervios: ["V. Nervios raquideos", "Trayectos perifericos del sistema nervioso"],
      pares: ["VI. Pares craneales", "Doce pares originados en el encefalo"],
      glosario: ["Glosario", "Terminos clave del sistema nervioso"]
    };
    return titles[section] || titles.inicio;
  }

  function setActive(link){
    document.querySelectorAll(".nav-link").forEach(item => item.classList.remove("is-active"));
    link.classList.add("is-active");
    const [title, subtitle] = titleFor(link.dataset.section);
    document.getElementById("sectionTitle").textContent = title;
    document.getElementById("sectionSubtitle").textContent = subtitle;
  }

  window.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const mobileQuery = window.matchMedia("(max-width: 900px)");

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        setActive(link);
        if (mobileQuery.matches) {
          sidebar?.classList.remove("is-open");
          document.body.classList.remove("sidebar-open");
          document.getElementById("sidebarToggle")?.setAttribute("aria-expanded", "false");
        } else {
          document.body.classList.remove("sidebar-collapsed");
          document.getElementById("sidebarToggle")?.setAttribute("aria-expanded", "true");
        }
        if (link.dataset.plane && window.atlasViewer) {
          window.atlasViewer.setPlane(link.dataset.plane);
        }
      });
    });

    document.querySelectorAll("[data-section-link]").forEach(button => {
      button.addEventListener("click", () => {
        document.getElementById(button.dataset.sectionLink)?.scrollIntoView({ behavior: "smooth" });
      });
    });
  });
})();
