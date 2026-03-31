document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("habilidades");
  if (!section) return;

  const items = section.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.18 },
  );

  items.forEach((item) => observer.observe(item));
});
document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("habilidades");
  if (!section) return;

  const items = section.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.18 },
  );

  items.forEach((item) => observer.observe(item));
});
