// ===== LIGHTWEIGHT LOADER =====
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// ===== BACKGROUND NEURON ANIMATION =====
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
            ctx.fillStyle = 'rgba(41, 121, 255, 0.5)'; // Blue
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = window.innerWidth < 768 ? 30 : 60;
        for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 229, 255, ${0.1 - dist/1500})`; // Cyan lines
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

// ===== TOAST NOTIFICATION LOGIC =====
function showToast(message, icon = 'info') {
    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = toast.querySelector('.material-icons');

    if(toast && toastMessage) {
        toastMessage.textContent = message;
        toastIcon.textContent = icon;
        toast.classList.add('show');
        setTimeout(() => { toast.classList.remove('show'); }, 3000);
    }
}

// ===== FORM HANDLING =====
const form = document.getElementById('contactForm');
const messageBox = document.getElementById('formMessage');
const charCount = document.querySelector('.char-count small');
const textarea = document.getElementById('message');

if (textarea) {
    textarea.addEventListener('input', () => {
        const len = textarea.value.length;
        charCount.textContent = `${len}/1000`;
        if(len > 1000) charCount.style.color = '#ff1744';
        else charCount.style.color = '#6c757d';
    });
}

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };

        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SENDING...';
        btn.disabled = true;

        setTimeout(() => {
            // Updated plain English email parameters
            const subject = `Swiftsync Service: ${formData.service}`;
            const body = `Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0A%0AMessage:%0A${formData.message}`;
            
            window.location.href = `mailto:chengeseth25@gmail.com?subject=${subject}&body=${body}`;

            btn.innerHTML = '<span class="material-icons">check</span> SENT';
            btn.style.background = '#00c853'; // Success Green
            
            showToast('Message Sent Successfully', 'send');

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.background = '';
                form.reset();
            }, 3000);
        }, 1500);
    });
}

// ===== COPY TO CLIPBOARD =====
document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        
        input.select();
        document.execCommand('copy');
        
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<span class="material-icons">check</span>';
        btn.style.background = '#00c853';
        showToast('Copied to clipboard', 'content_copy');
        
        setTimeout(() => {
            btn.innerHTML = originalIcon;
            btn.style.background = '';
        }, 2000);
    });
});

// ===== SCROLL REVEAL =====
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

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
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(11, 14, 20, 0.98)';
        navbar.style.boxShadow = "0 4px 6px rgba(0,0,0,0.3)";
    } else {
        navbar.style.background = 'rgba(11, 14, 20, 0.9)';
        navbar.style.boxShadow = "none";
    }
});