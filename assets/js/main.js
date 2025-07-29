document.addEventListener('DOMContentLoaded', function() {
    // Safe element selection with null checks
    const getElement = (selector) => {
        const el = document.querySelector(selector);
        if (!el) console.warn(`Element not found: ${selector}`);
        return el;
    };

    const getElements = (selector) => {
        const els = document.querySelectorAll(selector);
        if (els.length === 0) console.warn(`No elements found: ${selector}`);
        return els;
    };

    // Cursor Effect
    const cursor = getElement('.cursor');
    const cursorFollower = getElement('.cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            setTimeout(() => {
                cursorFollower.style.left = `${e.clientX}px`;
                cursorFollower.style.top = `${e.clientY}px`;
            }, 100);
        });
        
        // Interactive elements effect
        const interactiveElements = getElements('a, button, .project-card, .about-card, input, textarea');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(0.5)';
                cursorFollower.style.backgroundColor = 'rgba(108, 99, 255, 0.3)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.backgroundColor = 'transparent';
            });
        });
    }

    // Mobile menu toggle
    const menuToggle = getElement('.menu-toggle');
    const nav = getElement('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking on a link
        const navLinks = getElements('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }

    // Navbar scroll effect
    const navbar = getElement('.glass-nav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        // Initialize scroll state
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }

    // Smooth scrolling for anchor links
    const anchorLinks = getElements('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = getElement(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active link highlighting
    const sections = getElements('section');
    const navLinks = getElements('nav ul li a');
    
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id') || '';
                }
            });
            
            navLinks.forEach(link => {
                link.classList.toggle(
                    'active', 
                    link.getAttribute('href') === `#${current}`
                );
            });
        });
    }

    // Form submission
    const contactForm = getElement('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = getElements('.about-card, .project-card, .section-title, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const animatedElements = getElements('.about-card, .project-card, .contact-info, .contact-form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});