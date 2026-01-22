// ===== LIGHTWEIGHT LOADER =====
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        // Smooth fade out
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// ===== PARTICLE BACKGROUND (Blue/Cyan Theme) =====
const canvas = document.getElementById('neuron-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Slow, floating movement
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }
        draw() {
            // Primary Blue Particles
            ctx.fillStyle = 'rgba(41, 121, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        // Reduce particle count on mobile for performance
        const count = window.innerWidth < 768 ? 30 : 60;
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Draw connecting lines
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < 150) {
                    // Cyan Connection Lines
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 229, 255, ${0.1 - dist/1500})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', () => { resize(); initParticles(); });
    resize(); initParticles(); animateParticles();
}

// ===== SCROLL REVEAL & COUNTERS =====
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Check for counters inside this revealed element
            const counters = entry.target.querySelectorAll('.counter');
            if (counters.length > 0) {
                counters.forEach(animateCounter);
            }
            
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Counter Animation Logic
function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    
    let current = 0;
    const updateCount = () => {
        current += increment;
        if (current < target) {
            counter.innerText = Math.ceil(current) + "+";
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = target + "+";
        }
    };
    updateCount();
}


// ===== SIDEBAR LOGIC (Mobile) =====
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarClose = document.getElementById('sidebarClose');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    sidebar.classList.add('active');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (sidebarToggle) sidebarToggle.addEventListener('click', openSidebar);
if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);


// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(11, 14, 20, 0.98)"; // Dark Navy
        navbar.style.boxShadow = "0 4px 6px rgba(0,0,0,0.3)";
    } else {
        navbar.style.background = "rgba(11, 14, 20, 0.9)"; // Slightly transparent at top
        navbar.style.boxShadow = "none";
    }
});