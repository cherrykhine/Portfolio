/* =========================================
   ELEMENTS
========================================= */

const themeToggleBtn = document.getElementById("theme-toggle");
const mobileToggleBtn = document.getElementById("mobile-toggle");
const navLinks = document.getElementById("nav-links");
const themeIcon = document.getElementById("theme-icon");


/* =========================================
   THEME MANAGEMENT
========================================= */

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
  .matches
  ? "dark"
  : "light";

const savedTheme = localStorage.getItem("theme") || systemTheme;

document.documentElement.setAttribute("data-theme", savedTheme);

updateThemeIcon(savedTheme);

function updateThemeIcon(theme) {

  if (!themeIcon) return;

  if (theme === "dark") {

    // SUN ICON
    themeIcon.innerHTML = `
      <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18.75a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM6.166 18.894a.75.75 0 0 1-1.06-1.06l1.59-1.591a.75.75 0 1 1 1.061 1.06l-1.59 1.591ZM2.25 12a.75.75 0 0 1 .75-.75H5.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75ZM6.166 6.166a.75.75 0 0 1 1.06-1.06l1.59 1.591a.75.75 0 1 1-1.061 1.06l-1.59-1.591Z"/>
    `;

  } else {

    // MOON ICON
    themeIcon.innerHTML = `
      <path fill-rule="evenodd" clip-rule="evenodd"
      d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"/>
    `;
  }
}


// TOGGLE THEME
if (themeToggleBtn) {

  themeToggleBtn.addEventListener("click", () => {

    const currentTheme =
      document.documentElement.getAttribute("data-theme");

    const newTheme =
      currentTheme === "dark"
        ? "light"
        : "dark";

    document.documentElement.setAttribute(
      "data-theme",
      newTheme
    );

    localStorage.setItem("theme", newTheme);

    updateThemeIcon(newTheme);
  });
}


/* =========================================
   MOBILE NAVIGATION
========================================= */

if (mobileToggleBtn && navLinks) {

  mobileToggleBtn.addEventListener("click", () => {

    const isActive =
      navLinks.classList.toggle("active");

    document.body.style.overflow =
      isActive ? "hidden" : "";

    // CLOSE ICON
    if (isActive) {

      mobileToggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2">

          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12" />

        </svg>
      `;

    } else {

      // HAMBURGER ICON
      mobileToggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2">

          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16m-7 6h7" />

        </svg>
      `;
    }
  });
}


// CLOSE MOBILE MENU ON LINK CLICK
if (navLinks) {

  navLinks.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("active");

      document.body.style.overflow = "";

      if (mobileToggleBtn) {

        mobileToggleBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">

            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16m-7 6h7" />

          </svg>
        `;
      }
    });
  });
}


/* =========================================
   FOOTER YEAR
========================================= */

const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* =========================================
   ACTIVE NAVIGATION LINK
========================================= */

const currentPage =
  location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a")
  .forEach((link) => {

    const href = link.getAttribute("href");

    if (!href) return;

    // Skip section links
    if (href.startsWith("#")) return;

    link.classList.remove("active");

    const linkPage =
      href.split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });




/* =========================================
   CAROUSEL
========================================= */

const slides =
  document.querySelectorAll(".carousel-slide");

const prevBtn =
  document.getElementById("prev");

const nextBtn =
  document.getElementById("next");

if (
  slides.length &&
  prevBtn &&
  nextBtn
) {

  let index = 0;

  slides[index].classList.add("active");

  function goTo(i) {

    slides[index].classList.remove("active");

    index =
      (i + slides.length) % slides.length;

    slides[index].classList.add("active");
  }

  prevBtn.addEventListener(
    "click",
    () => goTo(index - 1)
  );

  nextBtn.addEventListener(
    "click",
    () => goTo(index + 1)
  );
}




/* =========================================
   CONTACT FORM
========================================= */

const form =
  document.getElementById("contactForm");

const formStatus =
  document.getElementById("formStatus");

if (form) {

  form.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (formStatus) {
      formStatus.innerHTML = "Sending... ";
    }

    try {

      const response = await fetch(form.action, {

        method: "POST",

        body: new FormData(form),

        headers: {
          Accept: "application/json"
        }
      });

      if (formStatus) {

        formStatus.innerHTML =
          response.ok
            ? "Message sent successfully"
            : "Failed to send message";
      }

      if (response.ok) {
        form.reset();
      }

    } catch (err) {

      if (formStatus) {
        formStatus.innerHTML = "Network error";
      }
    }

    setTimeout(() => {

      if (formStatus) {
        formStatus.innerHTML = "";
      }

    }, 3000);
  });
}

document.addEventListener("DOMContentLoaded", function () {

  const filterButtons = document.querySelectorAll(".project-filters button");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {

    button.addEventListener("click", function () {

      // REMOVE ACTIVE
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // ADD ACTIVE
      button.classList.add("active");

      const filter = button.dataset.filter;

      projectCards.forEach((card) => {

        if (
          filter === "all" ||
          card.dataset.category === filter
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }

      });

    });

  });

});