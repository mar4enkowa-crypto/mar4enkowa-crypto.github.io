const navLinks = Array.from(document.querySelectorAll(".main-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        const activeLink = navLinks.find((link) => link.getAttribute("href") === `#${entry.target.id}`);
        navLinks.forEach((link) => link.classList.toggle("is-active", link === activeLink));
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
  );

  sections.forEach((section) => observer.observe(section));
}

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");
const closeLightbox = document.querySelector(".lightbox-close");
let lastFocusedCard = null;

function openLightbox(card) {
  lastFocusedCard = card;
  const full = card.dataset.full;
  const title = card.dataset.title;
  const image = card.querySelector("img");

  lightboxImage.src = full;
  lightboxImage.alt = image ? image.alt : title;
  lightboxTitle.textContent = title;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("has-lightbox");
  closeLightbox.focus();
}

function hideLightbox() {
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("has-lightbox");
  lightboxImage.removeAttribute("src");

  if (lastFocusedCard) {
    lastFocusedCard.focus();
  }
}

document.querySelectorAll(".evidence-card").forEach((card) => {
  card.addEventListener("click", () => openLightbox(card));
});

closeLightbox.addEventListener("click", hideLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    hideLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.getAttribute("aria-hidden") === "false") {
    hideLightbox();
  }
});
