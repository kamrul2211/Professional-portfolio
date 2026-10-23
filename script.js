/* =====================================================
   NAVBAR
===================================================== */

const header = document.getElementById("header");
const navMenu = document.getElementById("navMenu");
const navToggle = document.getElementById("navToggle");
const navClose = document.getElementById("navClose");
const navLinks = document.querySelectorAll(".nav-link");


/* Mobile Menu */

navToggle.addEventListener("click", () => {
    navMenu.classList.add("show");
});


navClose.addEventListener("click", () => {
    navMenu.classList.remove("show");
});


/* Close menu when clicking link */

navLinks.forEach(link => {

    link.addEventListener("click", () => {
        navMenu.classList.remove("show");
    });

});


/* Navbar scroll */

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {

    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `.nav-link[href="#${sectionId}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        }

    });

}

window.addEventListener("scroll", updateActiveNav);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =====================================================
   COUNTER
===================================================== */

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    counterStarted = true;

    counters.forEach(counter => {

        const target = Number(
            counter.getAttribute("data-target")
        );

        let current = 0;

        const increment = Math.max(
            target / 50,
            1
        );

        const updateCounter = () => {

            current += increment;

            if (current < target) {

                counter.textContent =
                    Math.ceil(current) + "+";

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent =
                    target + "+";

            }

        };

        updateCounter();

    });

}


const statsSection = document.querySelector(".stats-grid");

if (statsSection) {

    const statsObserver = new IntersectionObserver(
        entries => {

            if (entries[0].isIntersecting) {
                startCounters();
            }

        },
        {
            threshold: 0.5
        }
    );

    statsObserver.observe(statsSection);
}


/* =====================================================
   PROJECT FILTER
===================================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
            button.getAttribute("data-filter");

        projectCards.forEach(card => {

            const category =
                card.getAttribute("data-category");

            if (
                filter === "all" ||
                category === filter
            ) {

                card.classList.remove("hide");

            } else {

                card.classList.add("hide");

            }

        });

    });

});


/* =====================================================
   TESTIMONIAL SLIDER
===================================================== */

const testimonialTrack =
    document.getElementById("testimonialTrack");

const testimonialPrev =
    document.getElementById("testimonialPrev");

const testimonialNext =
    document.getElementById("testimonialNext");

const testimonialDots =
    document.querySelectorAll(
        "#testimonialDots span"
    );


let currentTestimonial = 0;

const testimonialCount =
    document.querySelectorAll(
        ".testimonial-card"
    ).length;


function updateTestimonial() {

    testimonialTrack.style.transform =
        `translateX(-${currentTestimonial * 100}%)`;

    testimonialDots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentTestimonial
        );

    });

}


testimonialNext.addEventListener("click", () => {

    currentTestimonial++;

    if (currentTestimonial >= testimonialCount) {
        currentTestimonial = 0;
    }

    updateTestimonial();

});


testimonialPrev.addEventListener("click", () => {

    currentTestimonial--;

    if (currentTestimonial < 0) {
        currentTestimonial = testimonialCount - 1;
    }

    updateTestimonial();

});


/* Auto Slider */

setInterval(() => {

    currentTestimonial++;

    if (currentTestimonial >= testimonialCount) {
        currentTestimonial = 0;
    }

    updateTestimonial();

}, 6000);


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", event => {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        event.preventDefault();

        formMessage.textContent = "Please fill in all fields.";
        formMessage.style.color = "#f87171";

        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        event.preventDefault();

        formMessage.textContent = "Please enter a valid email address.";
        formMessage.style.color = "#f87171";

        return;
    }

    

});


/* =====================================================
   BACK TO TOP
===================================================== */

const backTop =
    document.getElementById("backTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (targetId === "#") return;

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth"
        });

    });

});


/* =====================================================
   PREVENT EMPTY LINKS
===================================================== */

document.querySelectorAll('a[href="#"]').forEach(link => {

    link.addEventListener("click", event => {
        event.preventDefault();
    });

});