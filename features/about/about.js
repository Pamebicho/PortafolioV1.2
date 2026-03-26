class AboutController {
  constructor() {
    this.section = document.getElementById("sobre-mi");

    if (!this.section) return;

    this.counters = this.section.querySelectorAll(
      ".about__stat-number[data-target]",
    );
    this.revealEls = this.section.querySelectorAll(
      ".about__stat-item, .about__text, .about__btn, .about__signature",
    );

    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");

          if (entry.target.classList.contains("about__stat-number")) {
            this.animateCounter(entry.target);
          }

          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.22 },
    );

    this.counters.forEach((counter) => observer.observe(counter));
    this.revealEls.forEach((element) => observer.observe(element));
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.target, 10);
    const suffix = element.dataset.suffix || "";
    const duration = 1600;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easedProgress * target);

      element.textContent = `${currentValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = `${target}${suffix}`;
      }
    };

    requestAnimationFrame(updateCounter);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AboutController();
});
