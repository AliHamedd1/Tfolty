const EXTERNAL_REGISTRATION_LINK = "https://example.com";

const header = document.querySelector("#site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinksContainer = document.querySelector("#primary-menu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const yearElement = document.querySelector("#year");
const registrationLinks = document.querySelectorAll("[data-registration-link]");
const logoImage = document.querySelector(".logo-image");

registrationLinks.forEach((link) => {
    link.href = EXTERNAL_REGISTRATION_LINK;
});

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

logoImage?.addEventListener("error", () => {
    logoImage.classList.add("is-hidden");
});

const closeMenu = () => {
    if (!menuToggle || !navLinksContainer) return;

    menuToggle.classList.remove("active");
    navLinksContainer.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "فتح القائمة");
};

const openMenu = () => {
    if (!menuToggle || !navLinksContainer) return;

    menuToggle.classList.add("active");
    navLinksContainer.classList.add("open");
    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "إغلاق القائمة");
};

menuToggle?.addEventListener("click", () => {
    const isOpen = navLinksContainer?.classList.contains("open");

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
});

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
        closeMenu();
    }
});

const updateHeaderState = () => {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 8);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

const setActiveLink = (id) => {
    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
};

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
    }
);

sections.forEach((section) => observer.observe(section));
