(() => {
  window.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("mouseover", event => {
      const hotspot = event.target.closest?.(".hotspot");
      if (!hotspot) return;
      const structure = (window.brainData?.structures || []).find(item => item.id === hotspot.dataset.id);
      if (structure) hotspot.setAttribute("aria-label", `${structure.name}: ${structure.function}`);
    });
  });
})();
