// ==========================================
// ===== 1. PREMIUM PRELOADER LOGIC =====
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Slight delay so the user sees the smooth spinner
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Remove from DOM after fade out
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 400); 
    }
});

// ==========================================
// ===== 2. STRIPE-STYLE MESH GRADIENT =====
// ==========================================
// Replaces the harsh particle network with a premium, slow-moving soft gradient
const canvas = document.getElementById('gradient-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let time = 0;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function animateGradient() {
        ctx.clearRect(0, 0, width, height);
        time += 0.002; // Very slow, luxurious movement

        // Orbiting coordinates for the gradients
        const x1 = width / 2 + Math.cos(time) * (width / 3);
        const y1 = height / 2 + Math.sin(time) * (height / 3);
        
        const x2 = width / 2 + Math.sin(time + Math.PI) * (width / 3);
        const y2 = height / 2 + Math.cos(time + Math.PI) * (height / 3);

        // Primary "Blurple" soft glow
        const grd1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, width * 0.8);
        grd1.addColorStop(0, 'rgba(99, 91, 255, 0.04)'); 
        grd1.addColorStop(1, 'rgba(255, 255, 255, 0)');

        // Secondary Cyan soft glow
        const grd2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, width * 0.8);
        grd2.addColorStop(0, 'rgba(0, 212, 255, 0.04)'); 
        grd2.addColorStop(1, 'rgba(255, 255, 255, 0)');

        // Fill background base
        ctx.fillStyle = '#f6f9fc'; 
        ctx.fillRect(0, 0, width, height);
        
        // Overlay moving gradients
        ctx.fillStyle = grd1;
        ctx.fillRect(0, 0, width, height);
        
        ctx.fillStyle = grd2;
        ctx.fillRect(0, 0, width, height);

        requestAnimationFrame(animateGradient);
    }

    window.addEventListener('resize', resize);
    resize();
    animateGradient();
}

// ==========================================
// ===== 3. SCROLL REVEAL ANIMATIONS =====
// ==========================================
const observerOptions = { 
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Target both class names we used across the HTML files
document.querySelectorAll('.reveal, .scroll-reveal').forEach(el => observer.observe(el));


// ==========================================
// ===== 4. LIGHT THEME NAVBAR GLASS =====
// ==========================================
const navbar = document.querySelector('.premium-navbar') || document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = "0 4px 15px rgba(10, 37, 64, 0.05)";
            navbar.style.borderBottom = "1px solid transparent";
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = "0 1px 2px rgba(0,0,0,0.03)";
            navbar.style.borderBottom = "1px solid rgba(10, 37, 64, 0.05)";
        }
    });
}


// ==========================================
// ===== 5. MOBILE SIDEBAR LOGIC =====
// ==========================================
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarClose = document.getElementById('sidebarClose');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function openSidebar() {
    if(sidebar && sidebarOverlay) {
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeSidebar() {
    if(sidebar && sidebarOverlay) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (sidebarToggle) sidebarToggle.addEventListener('click', openSidebar);
if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);


// ==========================================
// ===== 6. SCROLL TO TOP BUTTON =====
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    
    if (scrollTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add("show");
            } else {
                scrollTopBtn.classList.remove("show");
            }
        });

        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // CV Specific: Hook up the download button to trigger the print dialog
    // Modern browsers format prints to PDF beautifully
    const downloadBtn = document.getElementById('downloadBtn');
    if(downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            window.print();
        });
    }
});