// ===== LOADER (FASTER) =====
window.addEventListener('load', () => {
    const loaderBar = document.querySelector('.loader-bar');
    const loader = document.querySelector('.loader-wrapper');

    loaderBar.style.width = '100%';
    loaderBar.style.transition = 'width 0.3s ease'; // Faster bar

    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        
        // Slight entry animation for card
        const cvCard = document.querySelector('.cv-card');
        if (cvCard) {
            cvCard.style.opacity = '1';
            cvCard.style.transform = 'translateY(0)';
        }
    }, 400); // Reduced delay from 800 to 400
});

// ===== BACKGROUND ANIMATION =====
const canvas = document.getElementById('neuron-canvas');
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
        this.vx = (Math.random() - 0.5) * 0.5;
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
        ctx.fillStyle = 'rgba(0, 243, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 243, 255, ${0.1 - distance/1500})`;
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

// ===== DOWNLOAD BUTTON LOGIC =====
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // For a real PDF download, you would typically use a library like html2pdf.js
        // For this implementation, we will trigger the print dialog which allows "Save as PDF"
        window.print();
    });
}

// ===== SIDEBAR LOGIC =====
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

// Navbar Glass
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) navbar.style.background = 'rgba(5, 5, 5, 0.95)';
    else navbar.style.background = 'transparent';
});