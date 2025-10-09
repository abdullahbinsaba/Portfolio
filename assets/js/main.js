    // Scroll to top functionality
        document.getElementById('scrollUp').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Scroll to bottom functionality
        document.getElementById('scrollDown').addEventListener('click', function() {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        });

        // Show/hide scroll buttons based on scroll position
        window.addEventListener('scroll', function() {
            const scrollUp = document.getElementById('scrollUp');
            const scrollDown = document.getElementById('scrollDown');
            
            if (window.scrollY > 500) {
                scrollUp.style.display = 'flex';
            } else {
                scrollUp.style.display = 'none';
            }
            
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
                scrollDown.style.display = 'none';
            } else {
                scrollDown.style.display = 'flex';
            }
        });

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });

        // Navbar background on scroll
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            if (window.scrollY > 50) {
                nav.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
                nav.style.padding = '15px 50px';
            } else {
                nav.style.backgroundColor = 'rgba(10, 25, 47, 0.9)';
                nav.style.padding = '20px 50px';
            }
        });
