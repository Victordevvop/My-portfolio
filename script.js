document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Footer Year
    const yearElem = document.getElementById('year');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }

    // 2. Dark / Light Theme Toggle (Default: Light Theme)
    const themeBtn = document.getElementById('theme-toggle');

    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }

    if (themeBtn) {
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
    }

    // 3. Mobile Navigation Drawer Toggle & Navbar Scroll Effect
    const mainHeader = document.getElementById('main-header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    // Sticky Navbar Scroll Shadow Effect
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            mainHeader.classList.toggle('scrolled', window.scrollY > 20);
        });
    }

    if (mobileMenuBtn && navMenu) {
        const closeMobileDrawer = () => {
            navMenu.classList.remove('mobile-active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        };

        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = navMenu.classList.toggle('mobile-active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (isExpanded) {
                    icon.classList.replace('fa-bars', 'fa-times');
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });

        // Close mobile drawer when link is clicked
        const navLinksList = navMenu.querySelectorAll('a');
        navLinksList.forEach(link => {
            link.addEventListener('click', closeMobileDrawer);
        });

        // Close mobile drawer on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('mobile-active')) {
                closeMobileDrawer();
                mobileMenuBtn.focus();
            }
        });

        // Close mobile drawer on click outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('mobile-active') && !mainHeader.contains(e.target)) {
                closeMobileDrawer();
            }
        });
    }

    // 4. Technical Skills Category Filtering
    const skillTabBtns = document.querySelectorAll('#skills-tabs .tab-btn');
    const skillCategoryGroups = document.querySelectorAll('.skill-category-group');

    skillTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            skillCategoryGroups.forEach(group => {
                const groupCat = group.getAttribute('data-category');
                if (category === 'all' || groupCat === category) {
                    group.style.display = 'block';
                    group.classList.add('active');
                } else {
                    group.style.display = 'none';
                }
            });
        });
    });

    // 5. Projects Category Filtering
    const projectTabBtns = document.querySelectorAll('#projects-tabs .project-tab-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (projectTabBtns.length > 0 && projectCards.length > 0) {
        projectTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                projectTabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    if (filter === 'all' || cardCategory === filter) {
                        card.style.display = 'flex';
                        card.classList.add('active');
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 6. Active Nav Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // 7. Scroll Reveal Animation Observer
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        // Immediately activate Hero / About section so top elements are never hidden
        document.querySelectorAll('#about .reveal, #main-header .reveal').forEach(el => el.classList.add('active'));

        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: '0px 0px -10px 0px',
                threshold: 0.01
            });

            revealElements.forEach(el => revealObserver.observe(el));
        } else {
            revealElements.forEach(el => el.classList.add('active'));
        }
    }

    // 8. Image Modal Lightbox Logic
    const profilePic = document.getElementById('profile-pic');
    const imageModal = document.getElementById('image-modal');
    const modalClose = document.getElementById('modal-close');

    if (profilePic && imageModal && modalClose) {
        profilePic.addEventListener('click', () => {
            imageModal.classList.add('active');
            imageModal.setAttribute('aria-hidden', 'false');
        });

        modalClose.addEventListener('click', () => {
            imageModal.classList.remove('active');
            imageModal.setAttribute('aria-hidden', 'true');
        });

        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                imageModal.classList.remove('active');
                imageModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // 9. Code Terminal Widget Tab Switching
    const terminalTabs = document.querySelectorAll('.terminal-tab');
    const codeBlocks = document.querySelectorAll('.code-block');
    const langLabel = document.querySelector('.terminal-lang');

    const langNames = {
        php: 'PHP 8.2',
        js: 'JavaScript ES6',
        sql: 'MySQL 8.0'
    };

    terminalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            terminalTabs.forEach(t => t.classList.remove('active'));
            codeBlocks.forEach(b => b.classList.remove('active'));

            tab.classList.add('active');
            const targetTab = tab.getAttribute('data-tab');
            const targetBlock = document.getElementById(`code-${targetTab}`);

            if (targetBlock) {
                targetBlock.classList.add('active');
            }
            if (langLabel && langNames[targetTab]) {
                langLabel.textContent = langNames[targetTab];
            }
        });
    });

    // 10. FAQ Accordion Toggle
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const faqItem = btn.parentElement;
            const isOpen = faqItem.classList.contains('active');

            // Close other open items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isOpen) {
                faqItem.classList.add('active');
            }
        });
    });

    // 11. Mouse movement background glow effect
    const bgGlow = document.querySelector('.background-glow');
    if (bgGlow) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            bgGlow.animate({
                left: `${x}px`,
                top: `${y}px`
            }, {
                duration: 2500,
                fill: "forwards"
            });
        });
    }
});




