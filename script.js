// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const menuIcon = menuToggle.querySelector("i");

function closeMenu() {
    navLinks.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");
}

function toggleMenu() {
    const isOpen = navLinks.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuIcon.classList.toggle("fa-bars", !isOpen);
    menuIcon.classList.toggle("fa-xmark", isOpen);
}

menuToggle.addEventListener("click", toggleMenu);

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", closeMenu);
});

// Close the mobile menu if a click lands outside it
document.addEventListener("click", (event) => {
    const clickedInsideNav = event.target.closest("nav");
    if (!clickedInsideNav && navLinks.classList.contains("active")) {
        closeMenu();
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-link");

function setActiveLink() {
    let current = sections[0]?.id;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.id;
        }
    });

    navAnchors.forEach((anchor) => {
        anchor.classList.toggle("active-link", anchor.getAttribute("href") === `#${current}`);
    });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
} else {
    // Fallback for older browsers: show everything immediately
    revealElements.forEach((el) => el.classList.add("is-visible"));
}

// ===== DYNAMIC COPYRIGHT YEAR =====
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}