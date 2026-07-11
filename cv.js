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
    
    // Add entry animation for the main CV card
    const cvCard = document.querySelector('.cv-card') || document.querySelector('.premium-card');
    if (cvCard && !cvCard.classList.contains('active')) {
        cvCard.classList.add('active');
    }
});

// ==========================================
// ===== 2. STRIPE-STYLE MESH GRADIENT =====
// ==========================================
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

        const x1 = width / 2 + Math.cos(time) * (width / 3);
        const y1 = height / 2 + Math.sin(time) * (height / 3);
        
        const x2 = width / 2 + Math.sin(time + Math.PI) * (width / 3);
        const y2 = height / 2 + Math.cos(time + Math.PI) * (height / 3);

        const grd1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, width * 0.8);
        grd1.addColorStop(0, 'rgba(99, 91, 255, 0.04)'); 
        grd1.addColorStop(1, 'rgba(255, 255, 255, 0)');

        const grd2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, width * 0.8);
        grd2.addColorStop(0, 'rgba(0, 212, 255, 0.04)'); 
        grd2.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = '#f6f9fc'; 
        ctx.fillRect(0, 0, width, height);
        
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
// ===== 3. LIGHT THEME NAVBAR GLASS =====
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
// ===== 4. SCROLL REVEAL ANIMATIONS =====
// ==========================================
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal, .scroll-reveal').forEach(el => observer.observe(el));

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
        document.body.style.overflow = 'hidden';
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
// ===== 6. DOWNLOAD / PRINT PDF LOGIC ======
// ==========================================
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
        // Trigger the browser's native print dialog. 
        // Modern browsers will format this beautifully using the @media print CSS we added.
        window.print();
    });
}