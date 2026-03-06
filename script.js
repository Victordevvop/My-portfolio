document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    // Check saved theme or fallback to user preference
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme == "light") {
        document.documentElement.setAttribute("data-theme", "light");
    } else if (currentTheme == "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else if (prefersDarkScheme.matches) {
        document.documentElement.setAttribute("data-theme", "dark");
    }

    themeBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");

        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle Menu');

    // Insert hamburger before nav links (after theme toggle)
    const navLinksContainer = document.querySelector('.nav-links');
    navLinksContainer.parentNode.insertBefore(mobileMenuBtn, navLinksContainer);

    mobileMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('mobile-active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinksContainer.classList.contains('mobile-active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('mobile-active');
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // Subtly track mouse movement for background glow
    const bgGlow = document.querySelector('.background-glow');

    // Smooth magnetic follow effect for the background glow
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        bgGlow.animate({
            left: `${x}px`,
            top: `${y}px`
        }, {
            duration: 3000,
            fill: "forwards"
        });
    });

    // Add subtle tilt effect to the card on hover if the device supports hover
    const card = document.querySelector('.glass');

    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

        // This gives a really premium 3D feel
        card.style.transform = `translateY(0) rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Reset when mouse leaves window
    document.addEventListener('mouseleave', () => {
        card.style.transform = `translateY(0) rotateY(0deg) rotateX(0deg)`;
        card.style.transition = 'transform 0.5s ease';
    });

    document.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});
