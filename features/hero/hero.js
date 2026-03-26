document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("inicio");
  const card = document.querySelector(".hero__card");
  const floatingItems = document.querySelectorAll(".hero__floating");

  if (!hero || !card) return;

  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 8;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    floatingItems.forEach((item, index) => {
      const depth = (index + 1) * 6;
      const moveX = (x - 0.5) * depth;
      const moveY = (y - 0.5) * depth;

      item.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  hero.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";

    floatingItems.forEach((item) => {
      item.style.transform = "translate(0, 0)";
    });
  });
});
