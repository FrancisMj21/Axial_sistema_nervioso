(() => {
  const state = {
    plane: "axial",
    selected: "talamo",
    slice: 5,
    zoom: 1,
    locked: false
  };

  const data = () => window.brainData || { structures: [], planes: {}, slices: [] };

  function structureById(id){
    return data().structures.find(item => item.id === id) || data().structures[0];
  }

  function setText(id, value){
    const node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function renderBrain(){
    const canvas = document.getElementById("viewerCanvas");
    if (!canvas) return;

    const structures = data().structures;
    const labelsLeft = structures.slice(2, 6);
    const labelsRight = structures.filter(item => !labelsLeft.includes(item)).slice(1, 6);

    canvas.innerHTML = `
      <div class="brain-stage" id="brainStage" style="transform:scale(${state.zoom})">

    <div class="brain-image-wrapper">

        <img
            src="assets/images/brain/axial/plano_axial.png"
            class="brain-image"
            alt="Plano axial del encefalo"
        />

        ${structures.map(hotspotMarkup).join("")}

        </div>

    </div>
    `;

    canvas.querySelectorAll(".hotspot").forEach(node => {
      node.addEventListener("click", () => selectStructure(node.dataset.id));
      node.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectStructure(node.dataset.id);
        }
      });
    });

    updateActiveHotspot();
  }

  function labelMarkup(item, x, y, side){
    const hx = item.x * 10;
    const hy = item.y * 6.2;
    const tx = side === "left" ? x : x + 10;
    const lineEnd = side === "left" ? x + 95 : x - 95;
    return `
      <line class="brain-line" x1="${hx}" y1="${hy}" x2="${lineEnd}" y2="${y - 4}"></line>
      <text class="brain-label" x="${tx}" y="${y}" text-anchor="${side === "left" ? "end" : "start"}">${item.name}</text>
    `;
  }

  function hotspotMarkup(item){
    return `
      <button
        class="hotspot"
        data-id="${item.id}"
        aria-label="${item.name}"
        style="
          left:${item.x}%;
          top:${item.y}%;
          background:${item.color};
        "
      ></button>
    `;
  }

  function renderSlices(){
    const strip = document.getElementById("sliceStrip");
    if (!strip) return;
    strip.innerHTML = data().slices.map(slice => `
      <button class="slice-thumb ${slice.id === state.slice ? "is-active" : ""}" type="button" data-slice="${slice.id}">
        <span class="slice-thumb__art"></span>
        <span>${slice.label}</span>
      </button>
    `).join("");
    strip.querySelectorAll("[data-slice]").forEach(button => {
      button.addEventListener("click", () => setSlice(Number(button.dataset.slice)));
    });
    setText("sliceLabel", `Corte ${state.slice}`);
  }

  function setPlane(plane){
    if (!data().planes[plane]) return;
    state.plane = plane;
    const info = data().planes[plane];
    setText("planeTitle", info.title);
    setText("planeSubtitle", info.subtitle);
    document.querySelectorAll(".plane-tab").forEach(button => {
      button.classList.toggle("is-active", button.dataset.plane === plane);
    });
  }

  function setSlice(slice){
    state.slice = Math.max(1, Math.min(9, slice));
    renderSlices();
  }

  function updateActiveHotspot(){
    document.querySelectorAll(".hotspot").forEach(node => {
      node.classList.toggle("is-active", node.dataset.id === state.selected);
    });
  }

  function selectStructure(id){
    const item = structureById(id);
    if (!item) return;
    state.selected = item.id;
    setText("selectedName", item.name);
    setText("selectedDescription", item.description);
    setText("selectedFunction", item.function);
    const facts = document.getElementById("selectedFacts");
    if (facts) {
      facts.innerHTML = Object.entries(item.facts).map(([key, value]) => (
        `<div><dt>${key}</dt><dd>${value}</dd></div>`
      )).join("");
    }
    const line = document.getElementById("selectedAccent");
    if (line) line.style.background = `linear-gradient(90deg, ${item.color}, rgba(255,255,255,.04))`;
    updateActiveHotspot();
  }

  function setZoom(next){
    if (state.locked) return;
    state.zoom = Math.max(.82, Math.min(1.35, next));
    const stage = document.getElementById("brainStage");
    if (stage) stage.style.transform = `scale(${state.zoom})`;
  }

  window.atlasViewer = { setPlane, selectStructure, setSlice };

  window.addEventListener("DOMContentLoaded", () => {
    renderBrain();
    renderSlices();
    selectStructure(state.selected);
    setPlane(state.plane);

    document.querySelectorAll(".plane-tab").forEach(button => {
      button.addEventListener("click", () => setPlane(button.dataset.plane));
    });

    document.getElementById("prevSlice")?.addEventListener("click", () => setSlice(state.slice - 1));
    document.getElementById("nextSlice")?.addEventListener("click", () => setSlice(state.slice + 1));
    document.getElementById("zoomIn")?.addEventListener("click", () => setZoom(state.zoom + .1));
    document.getElementById("zoomOut")?.addEventListener("click", () => setZoom(state.zoom - .1));
    document.getElementById("resetView")?.addEventListener("click", () => setZoom(1));
    document.getElementById("lockView")?.addEventListener("click", event => {
      state.locked = !state.locked;
      event.currentTarget.classList.toggle("is-active", state.locked);
    });
  });
})();
