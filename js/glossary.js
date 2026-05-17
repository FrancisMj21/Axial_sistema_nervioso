(() => {
  const normalize = value => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  let selectedLetter = "Todos";
  let selectedTerm = "";

  function data(){
    return (window.glossaryData || []).slice().sort((a, b) => a.term.localeCompare(b.term));
  }

  function renderLetters(){
    const target = document.getElementById("letterFilter");
    if (!target) return;
    const letters = ["Todos", ...new Set(data().map(item => item.term.charAt(0).toUpperCase()))];
    target.innerHTML = letters.map(letter => `
      <button type="button" class="${letter === selectedLetter ? "is-active" : ""}" data-letter="${letter}">${letter === "Todos" ? "All" : letter}</button>
    `).join("");
    target.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        selectedLetter = button.dataset.letter;
        renderGlossary();
      });
    });
  }

  function filteredTerms(){
    const input = document.getElementById("glossarySearch");
    const query = normalize(input?.value || "");
    return data().filter(item => {
      const matchesQuery = !query || normalize(`${item.term} ${item.definition}`).includes(query);
      const matchesLetter = selectedLetter === "Todos" || item.term.charAt(0).toUpperCase() === selectedLetter;
      return matchesQuery && matchesLetter;
    });
  }

  function renderGlossary(){
    const list = document.getElementById("glossaryList");
    if (!list) return;
    const terms = filteredTerms();
    list.innerHTML = terms.map(item => `
      <button class="term-card ${item.term === selectedTerm ? "is-active" : ""}" type="button" data-term="${item.term}">
        <strong>${item.term}</strong>
        <span>${item.definition}</span>
      </button>
    `).join("") || `<div class="term-card"><strong>Sin resultados</strong><span>Ajusta la busqueda o el filtro por letra.</span></div>`;
    list.querySelectorAll("[data-term]").forEach(button => {
      button.addEventListener("click", () => selectTerm(button.dataset.term));
    });
    renderLetters();
  }

  function selectTerm(term){
    const item = data().find(entry => normalize(entry.term) === normalize(term));
    if (!item) return;
    selectedTerm = item.term;
    const detail = document.getElementById("glossaryDetail");
    if (detail) {
      detail.innerHTML = `
        <p class="panel-kicker">Termino seleccionado</p>
        <h3>${item.term}</h3>
        <div class="accent-line"></div>
        <p>${item.definition}</p>
      `;
    }
    renderGlossary();
    document.getElementById("glosario")?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  window.atlasGlossary = { selectTerm };

  window.addEventListener("DOMContentLoaded", () => {
    const count = document.getElementById("termCount");
    if (count) count.textContent = String(data().length);
    renderLetters();
    renderGlossary();
    document.getElementById("glossarySearch")?.addEventListener("input", renderGlossary);
    document.querySelectorAll("[data-select-term]").forEach(button => {
      button.addEventListener("click", () => selectTerm(button.dataset.selectTerm));
    });
  });
})();
