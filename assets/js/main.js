/* ==========================================================================
   MAIN.JS — Global Initialization
   Portfolio: Robert Long | UI/UX Designer
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. THEME MANAGER (Dark / Light Toggle)
   -------------------------------------------------------------------------- */
class ThemeManager {
  constructor() {
    this.STORAGE_KEY = "rl-portfolio-theme";
    this.DEFAULT = "dark";
    this.toggleBtn = document.getElementById("themeToggle");
    this.toggleIcon = document.querySelector(".theme-toggle__icon");

    this._init();
  }

  _init() {
    // Apply saved or preferred theme
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const preferred = window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";

    this._applyTheme(saved || preferred);

    // Toggle on click
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener("click", () => this._toggle());
    }

    // Listen for OS theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this._applyTheme(e.matches ? "dark" : "light");
        }
      });
  }

  _applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(this.STORAGE_KEY, theme);

    // Update icon
    if (this.toggleIcon) {
      this.toggleIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }

    // Update aria-label
    if (this.toggleBtn) {
      this.toggleBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      );
    }
  }

  _toggle() {
    const current =
      document.documentElement.getAttribute("data-theme") || this.DEFAULT;
    this._applyTheme(current === "dark" ? "light" : "dark");

    // Fun rotation animation on toggle
    if (this.toggleBtn) {
      this.toggleBtn.style.transform = "rotate(360deg) scale(1.2)";
      setTimeout(() => {
        this.toggleBtn.style.transform = "";
      }, 300);
    }
  }
}

/* --------------------------------------------------------------------------
   2. SCROLL REVEAL (Intersection Observer)
   -------------------------------------------------------------------------- */
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll(".reveal");
    this._init();
  }

  _init() {
    if (!this.elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Unobserve after reveal (fire once)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    this.elements.forEach((el) => observer.observe(el));
  }
}

/* --------------------------------------------------------------------------
   3. SMOOTH SCROLL for anchor links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;

      e.preventDefault();

      const navHeight = document.getElementById("navbar")?.offsetHeight || 70;
      const top =
        target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

/* --------------------------------------------------------------------------
   4. INIT ALL ON DOM READY
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
  new ScrollReveal();
  initSmoothScroll();

  // Log portfolio initialized
  console.log(
    "%c🎨 Robert Long Portfolio — Loaded",
    "color: #FF6B35; font-weight: bold; font-size: 14px;",
  );
});
