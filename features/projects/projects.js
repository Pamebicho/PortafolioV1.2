const btn = document.getElementById("btnToggleProjects");
const hiddenProjects = document.querySelectorAll(".project-card--hidden");

if (btn && hiddenProjects.length > 0) {
  btn.addEventListener("click", () => {
    const isExpanded = btn.getAttribute("aria-expanded") === "true";

    hiddenProjects.forEach((card) => {
      card.style.display = isExpanded ? "none" : "flex";
    });

    btn.setAttribute("aria-expanded", String(!isExpanded));

    btn.innerHTML = isExpanded
      ? '<i class="bi bi-plus-lg"></i><span>Ver más proyectos</span>'
      : '<i class="bi bi-dash-lg"></i><span>Ver menos</span>';
  });
}
