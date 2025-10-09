// Element references
const intro = document.getElementById("intro-screen");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const loader = document.getElementById("loading-screen");
const canvas = document.getElementById("scene");
const bgMusic = document.getElementById("bg-music");

// Page references
const aboutPage = document.getElementById("about-page");
const contactPage = document.getElementById("contact-page");
const projectsPage = document.getElementById("projects-page");
const funPage = document.getElementById("fun-page");

// Show loader after clicking yes
yesBtn.addEventListener("click", () => {
  intro.style.display = "none";
  loader.classList.remove("hidden");
  setTimeout(() => {
    loader.classList.add("hidden");
    canvas.classList.remove("hidden");
    bgMusic.play();
    init3D();
  }, 3500);
});

// No button runs away
noBtn.addEventListener("mouseover", () => {
  noBtn.style.position = "absolute";
  noBtn.style.top = `${Math.random() * 80 + 10}%`;
  noBtn.style.left = `${Math.random() * 80 + 10}%`;
});

// ======== 3D Scene Setup ========
function init3D() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);

  // Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);

  const directional = new THREE.DirectionalLight(0xffffff, 1);
  directional.position.set(5, 10, 7);
  scene.add(directional);

  // Ground
  const groundGeo = new THREE.PlaneGeometry(200, 200);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Car
  const loader = new THREE.GLTFLoader();
  let car;
  loader.load("https://threejs.org/examples/models/gltf/Ferrari.glb", (gltf) => {
    car = gltf.scene;
    car.scale.set(1.5, 1.5, 1.5);
    scene.add(car);
  });

  camera.position.set(0, 5, 10);

  // Movement
  let speed = 0;
  const keys = {};

  window.addEventListener("keydown", (e) => (keys[e.key.toLowerCase()] = true));
  window.addEventListener("keyup", (e) => (keys[e.key.toLowerCase()] = false));

  function animate() {
    requestAnimationFrame(animate);
    if (car) {
      if (keys["w"]) speed += 0.02;
      if (keys["s"]) speed -= 0.02;
      if (keys["a"]) car.rotation.y += 0.05;
      if (keys["d"]) car.rotation.y -= 0.05;

      car.position.x -= Math.sin(car.rotation.y) * speed;
      car.position.z -= Math.cos(car.rotation.y) * speed;
      speed *= 0.95; // friction
      camera.position.lerp(new THREE.Vector3(car.position.x, car.position.y + 5, car.position.z + 10), 0.05);
      camera.lookAt(car.position);
    }
    renderer.render(scene, camera);
  }
  animate();
}                cursorFollower.style.backgroundColor = 'rgba(108, 99, 255, 0.3)';
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
