document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const ctaButtons = document.querySelector('.cta-buttons');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.classList.add('mobile-menu');

                const navLinksClone = navLinks.cloneNode(true);
                navLinksClone.style.display = 'flex';
                navLinksClone.style.flexDirection = 'column';
                navLinksClone.style.gap = '1rem';

                const ctaButtonsClone = ctaButtons.cloneNode(true);
                ctaButtonsClone.style.display = 'flex';
                ctaButtonsClone.style.flexDirection = 'column';
                ctaButtonsClone.style.gap = '1rem';
                ctaButtonsClone.style.marginTop = '1rem';

                mobileMenu.appendChild(navLinksClone);
                mobileMenu.appendChild(ctaButtonsClone);

                Object.assign(mobileMenu.style, {
                    position: 'fixed',
                    top: '80px',
                    left: '0',
                    width: '100%',
                    backgroundColor: 'var(--bg-dark)',
                    padding: '2rem',
                    zIndex: '100',
                    boxShadow: 'var(--shadow-lg)',
                    transform: 'translateY(-100%)',
                    opacity: '0',
                    transition: 'transform 0.3s ease, opacity 0.3s ease'
                });

                const closeButton = document.createElement('button');
                closeButton.innerHTML = '<i class="fas fa-times"></i>';
                closeButton.style.position = 'absolute';
                closeButton.style.top = '1rem';
                closeButton.style.right = '1rem';
                closeButton.style.background = 'none';
                closeButton.style.border = 'none';
                closeButton.style.color = 'var(--text-white)';
                closeButton.style.fontSize = '1.5rem';
                closeButton.style.cursor = 'pointer';

                closeButton.addEventListener('click', function () {
                    mobileMenu.style.transform = 'translateY(-100%)';
                    mobileMenu.style.opacity = '0';
                });

                mobileMenu.appendChild(closeButton);
                document.body.appendChild(mobileMenu);
            }

            const mobileMenu = document.querySelector('.mobile-menu');
            if (mobileMenu.style.transform === 'translateY(0px)') {
                mobileMenu.style.transform = 'translateY(-100%)';
                mobileMenu.style.opacity = '0';
            } else {
                mobileMenu.style.transform = 'translateY(0)';
                mobileMenu.style.opacity = '1';
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            e.preventDefault();

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.style.transform === 'translateY(0px)') {
                    mobileMenu.style.transform = 'translateY(-100%)';
                    mobileMenu.style.opacity = '0';
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    
    // Show success message if redirected via #form-success
    if (window.location.hash === '#form-success') {
        const form = document.querySelector('.demo-form');
        const successContainer = document.querySelector('#form-success');

        if (form) {
            form.style.display = 'none';
        }

        if (successContainer) {
            successContainer.innerHTML = `
                <div class="thank-you-message" style="
                    background: var(--secondary-color);
                    color: white;
                    padding: 1rem;
                    border-radius: var(--radius);
                    margin-top: 1rem;
                    text-align: center;
                ">
                    Thank you! We'll be in touch soon.
                </div>
            `;
            successContainer.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Intersection Observer animations
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.card, .step, .benefit, .security-feature, .testimonial');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    };

    if ('IntersectionObserver' in window) {
        animateOnScroll();
    }
});
