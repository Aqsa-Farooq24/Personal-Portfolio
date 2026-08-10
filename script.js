emailjs.init({
    publicKey: "9SPfUJkouHr0sBbPY",
});


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

//==contact form button==
const openFormBtn = document.getElementById("open-form-btn");
const formBox = document.getElementById("contact-form-box");
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const errorMsg = document.getElementById("form-error");
const sendBtn = document.getElementById("send-btn");
const sendBtnText = sendBtn.querySelector("span");
const successMsg = document.getElementById("form-success");

openFormBtn.addEventListener("click", function () {

    formBox.style.display = "block";

    openFormBtn.style.display = "none";

});

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();


    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const messageValue = messageInput.value.trim();
    const namePattern = /^[A-Za-zÀ-ÿ\s'-]+$/;

    if (!nameValue || !emailValue || !messageValue) {
        if (errorMsg) {
            errorMsg.style.display = "block";
            errorMsg.textContent = "Please fill all fields before sending!";
        }
        return;
    }

    if (!namePattern.test(nameValue)) {
        if (errorMsg) {
            errorMsg.style.display = "block";
            errorMsg.textContent = "Please enter a valid name using letters only.";
        }
        return;
    }

    if (!emailInput.checkValidity()) {
        if (errorMsg) {
            errorMsg.style.display = "block";
            errorMsg.textContent = "Please enter a valid email address.";
        }
        return;
    }

    if (errorMsg) {
        errorMsg.style.display = "none";
        errorMsg.textContent = "";
    }

    if (successMsg) {
        successMsg.style.display = "none";
        successMsg.textContent = "";
    }

    sendBtn.disabled = true;
    sendBtnText.textContent = "Sending...";
    emailjs.sendForm(
        "service_qirxxsx",
        "template_3ifxi6a",
        this
    )
        .then(() => {

            if (successMsg) {
                successMsg.style.display = "block";
                successMsg.textContent = "Thank you! Your message has been sent successfully.";
            }

            contactForm.reset();

            sendBtn.disabled = false;
            sendBtnText.textContent = "Send Message";

            setTimeout(() => {

                formBox.style.display = "none";

                openFormBtn.style.display = "inline-flex";

                if (successMsg) {
                    successMsg.style.display = "none";
                }

            }, 2000);

        })
        .catch(() => {

            sendBtn.disabled = false;
            sendBtnText.textContent = "Send Message";

            if (errorMsg) {
                errorMsg.style.display = "block";
                errorMsg.textContent = "Something went wrong. Please try again.";
            }

        });

});
