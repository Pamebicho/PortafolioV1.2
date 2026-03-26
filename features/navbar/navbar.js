document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("siteNavbar");
  const navLinks = document.querySelectorAll(".portfolio-navbar__link");
  const sections = document.querySelectorAll("section[id]");

  const updateNavbarOnScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  };

  const updateActiveLink = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => link.classList.remove("active"));

        const activeLink = document.querySelector(
          `.portfolio-navbar__link[href="#${sectionId}"]`,
        );

        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  };

  updateNavbarOnScroll();
  updateActiveLink();

  window.addEventListener("scroll", () => {
    updateNavbarOnScroll();
    updateActiveLink();
  });
});
