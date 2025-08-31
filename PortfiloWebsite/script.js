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