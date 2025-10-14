// Portfolio Initialization
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    // Simulate loading process
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('logoEntrance').style.display = 'flex';
        
        // Add click event to enter portfolio
        document.querySelector('.enter-portfolio').addEventListener('click', enterPortfolio);
    }, 3000);
}

function enterPortfolio() {
    const logoEntrance = document.getElementById('logoEntrance');
    const mainPortfolio = document.getElementById('mainPortfolio');
    
    // Animate exit of logo entrance
    logoEntrance.style.animation = 'fadeOut 1s ease forwards';
    
    setTimeout(() => {
        logoEntrance.style.display = 'none';
        mainPortfolio.classList.remove('hidden');
        
        // Animate entrance of main portfolio
        setTimeout(() => {
            mainPortfolio.classList.add('visible');
            initializePortfolioComponents();
        }, 100);
    }, 1000);
}

function initializePortfolioComponents() {
    // Initialize skills
    initializeSkills();
    
    // Initialize projects
    initializeProjects();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize scroll events
    initializeScrollEvents();
    
    // Initialize form handling
    initializeForms();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Create particle background
    createParticleBackground();
    
    // Initialize profile cards interaction
    initializeProfileCards();
    
    // Fix mobile layout on load
    fixMobileLayout();
}

// Skills Data
const skillsData = [
    { name: 'HTML5', level: '95%', icon: 'fab fa-html5' },
    { name: 'CSS3', level: '90%', icon: 'fab fa-css3-alt' },
    { name: 'JavaScript', level: '85%', icon: 'fab fa-js' },
    { name: 'Bootstrap', level: '88%', icon: 'fab fa-bootstrap' },
    { name: 'jQuery', level: '82%', icon: 'fas fa-code' },
    { name: '.NET', level: '75%', icon: 'fab fa-microsoft' },
    { name: 'Flutter', level: '70%', icon: 'fas fa-mobile-alt' },
    { name: 'PHP', level: '80%', icon: 'fab fa-php' },
    { name: 'Laravel', level: '78%', icon: 'fab fa-laravel' },
    { name: 'Python', level: '85%', icon: 'fab fa-python' }
];

function initializeSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    
    skillsData.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level">
                <div class="level-bar" style="--level: ${skill.level}"></div>
            </div>
        `;
        skillsGrid.appendChild(skillCard);
    });
}

// Projects Data
const projectsData = [
    {
        title: 'E-Commerce Platform',
        description: 'Full-featured online store with payment integration and admin dashboard.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel'],
        icon: '🛒'
    },
    {
        title: 'Task Management App',
        description: 'Responsive task organizer with drag-drop functionality and team collaboration.',
        technologies: ['Flutter', 'Dart', 'Firebase'],
        icon: '📱'
    },
    {
        title: 'Portfolio Website',
        description: 'Modern, animated portfolio with 3D effects and smooth interactions.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        icon: '💼'
    },
    {
        title: 'Data Analytics Dashboard',
        description: 'Interactive dashboard for data visualization and business intelligence.',
        technologies: ['.NET', 'JavaScript', 'SQL'],
        icon: '📊'
    }
];

function initializeProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                ${project.icon}
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <button class="quantum-btn secondary">View Details</button>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.quantum-nav') && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

function initializeScrollEvents() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initializeForms() {
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.querySelector('input[type="text"]').value;
        const email = document.querySelector('input[type="email"]').value;
        const message = document.querySelector('textarea').value;
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert(`Thank you for your message, ${name}! I will get back to you soon at ${email}.`);
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function initializeProfileCards() {
    const profileCards = document.querySelectorAll('.profile-card');
    
    profileCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add active class to clicked card
            profileCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Add subtle animation
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-25px) scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-20px) scale(1.05)';
                }, 300);
            }
        });
    });
}

function fixMobileLayout() {
    // Ensure mobile layout is applied correctly
    const profileCards = document.querySelectorAll('.profile-card');
    const container = document.querySelector('.profile-cards-container');
    
    if (window.innerWidth <= 768) {
        profileCards.forEach(card => {
            card.style.position = 'relative';
            card.style.top = 'auto';
            card.style.left = 'auto';
            card.style.right = 'auto';
            card.style.transform = 'none';
        });
        
        if (container) {
            container.style.flexDirection = 'column';
            container.style.gap = '25px';
        }
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

function downloadCV() {
    // In a real implementation, this would link to an actual CV file
    alert('CV download functionality would be implemented here. For now, please contact me directly.');
}

// Add CSS for fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(1.1); }
    }
    
    .profile-card.active {
        border-color: var(--accent);
        box-shadow: var(--neon-shadow);
        z-index: 100;
    }
`;
document.head.appendChild(style);

// Particle background effect
function createParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(0, 243, 255, ${Math.random() * 0.3})`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function init() {
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        init();
        fixMobileLayout(); // Re-apply mobile layout on resize
    });
    
    resizeCanvas();
    init();
    animate();
}

// Add interactive cursor effects for desktop
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        const cards = document.querySelectorAll('.skill-card, .project-card, .about-card, .profile-card');
        
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
                if (!card.classList.contains('profile-card') || !card.classList.contains('active')) {
                    card.style.transform = `perspective(1000px) rotateX(${(y - rect.height/2) / 20}deg) rotateY(${(x - rect.width/2) / 20}deg) scale3d(1.05, 1.05, 1.05)`;
                }
            } else {
                if (!card.classList.contains('profile-card') || !card.classList.contains('active')) {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                }
            }
        });
    }
});

// Handle window resize for mobile layout
window.addEventListener('resize', fixMobileLayout);