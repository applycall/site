document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const ctaButtons = document.querySelector('.cta-buttons');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.classList.add('mobile-menu');
                
                // Clone navigation links
                const navLinksClone = navLinks.cloneNode(true);
                navLinksClone.style.display = 'flex';
                navLinksClone.style.flexDirection = 'column';
                navLinksClone.style.gap = '1rem';
                
                // Clone CTA buttons
                const ctaButtonsClone = ctaButtons.cloneNode(true);
                ctaButtonsClone.style.display = 'flex';
                ctaButtonsClone.style.flexDirection = 'column';
                ctaButtonsClone.style.gap = '1rem';
                ctaButtonsClone.style.marginTop = '1rem';
                
                // Append clones to mobile menu
                mobileMenu.appendChild(navLinksClone);
                mobileMenu.appendChild(ctaButtonsClone);
                
                // Style mobile menu
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
                
                // Add close button
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
                
                closeButton.addEventListener('click', function() {
                    mobileMenu.style.transform = 'translateY(-100%)';
                    mobileMenu.style.opacity = '0';
                });
                
                mobileMenu.appendChild(closeButton);
                document.body.appendChild(mobileMenu);
            }
            
            // Toggle mobile menu
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
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.style.transform === 'translateY(0px)') {
                    mobileMenu.style.transform = 'translateY(-100%)';
                    mobileMenu.style.opacity = '0';
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const demoForm = document.querySelector('.demo-form');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            // Simulate API call
            setTimeout(() => {
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.textContent = 'Thank you! We\'ll be in touch soon.';
                successMessage.style.backgroundColor = 'var(--secondary-color)';
                successMessage.style.color = 'white';
                successMessage.style.padding = '1rem';
                successMessage.style.borderRadius = 'var(--radius)';
                successMessage.style.marginTop = '1rem';
                successMessage.style.textAlign = 'center';
                
                // Replace form with success message
                demoForm.innerHTML = '';
                demoForm.appendChild(successMessage);
            }, 2000);
        });
    }
    
    // Intersection Observer for animations
    const animateOnScroll = function() {
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
    
    // Initialize animations
    if ('IntersectionObserver' in window) {
        animateOnScroll();
    }
});
