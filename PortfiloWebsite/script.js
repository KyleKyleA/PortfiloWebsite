const toggle = document.getElementById('toggle');
        // Set initial state based on body class
        toggle.checked = document.body.classList.contains('light-mode');
        toggle.addEventListener('change', () => {
            if (toggle.checked) {
                document.body.classList.remove('dark-mode');
                document.body.classList.add('light-mode');
            } else {
                document.body.classList.remove('light-mode');
                document.body.classList.add('dark-mode');
            }
        });

         function hireMeClicked() {
        alert("Hire Me button clicked! You can add your custom action here.");
    }
    function projectsClicked() {
        alert("Projects button clicked! You can add your custom action here.");
    }

/*FUNCTION FOR THE CONTACT ME BUTTON */
window.addEventListener("load", () => {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    }
});

/* FUNCTION FOR THE SLIDING FEATURE CARDS */
const wrapper = document.querySelector('.services-wrapper');
const nextBtn = document.querySelector('.slide-btn.next');
const prevBtn = document.querySelector('.slide-btn.prev');

let currentIndex = 0;
const cardWidth = 320; // width + gap
const totalCards = document.querySelectorAll('.services-wrapper > div').length;

nextBtn.addEventListener('click', () => {
    if (currentIndex < totalCards - 1) {
        currentIndex++;
        wrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        wrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
});
