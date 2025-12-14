// Portfolio JavaScript
(function() {
    // Only run on portfolio page
    if (!document.querySelector('.portfolio-page')) return;

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;

    const trails = [];
    const maxTrails = 8;

    // Create trail elements
    for (let i = 0; i < maxTrails; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.opacity = (1 - i / maxTrails) * 0.6;
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0
        });
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let followerX = window.innerWidth / 2;
    let followerY = window.innerHeight / 2;

    // Set initial cursor positions
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    // Initialize trail positions
    trails.forEach(trail => {
        trail.x = window.innerWidth / 2;
        trail.y = window.innerHeight / 2;
        trail.element.style.left = trail.x + 'px';
        trail.element.style.top = trail.y + 'px';
    });

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Smooth follow for main cursor
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Slower follow for follower
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        // Update trails
        trails.forEach((trail, index) => {
            if (index === 0) {
                trail.x += (mouseX - trail.x) * 0.15;
                trail.y += (mouseY - trail.y) * 0.15;
            } else {
                trail.x += (trails[index - 1].x - trail.x) * 0.15;
                trail.y += (trails[index - 1].y - trail.y) * 0.15;
            }
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
            trail.element.style.transform = `translate(-50%, -50%) scale(${1 - index / maxTrails})`;
        });

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .portfolio-btn, .skill-card, .project-card, input, textarea');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
        trails.forEach(trail => trail.element.style.opacity = '0');
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '0.5';
        trails.forEach((trail, index) => {
            trail.element.style.opacity = (1 - index / maxTrails) * 0.6;
        });
    });

    // Create floating particles
    function createParticles() {
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
            document.body.appendChild(particle);
        }
    }

    createParticles();

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Form submission
    window.handlePortfolioSubmit = function(e) {
        e.preventDefault();
        alert('Message sent! (This is a demo - connect your own backend)');
        e.target.reset();
    };

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.portfolio-bg-animation');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Discord username copy functionality
    const discordLink = document.getElementById('discord-link');
    const discordUsername = 'bxst.';

    if (discordLink) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = 'Copied Username!';
        document.body.appendChild(notification);

        discordLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Copy to clipboard
            navigator.clipboard.writeText(discordUsername).then(() => {
                // Show notification
                notification.classList.add('show');
                
                // Hide notification after 2 seconds
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                // Fallback notification
                notification.textContent = 'Copy failed, username: ' + discordUsername;
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                    notification.textContent = 'Copied Username!';
                }, 3000);
            });
        });
    }
})();
