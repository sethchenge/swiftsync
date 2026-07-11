// ==========================================
// ===== 1. PREMIUM PRELOADER LOGIC =====
// ==========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 400); 
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
        time += 0.002; 

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
// ===== 6. SCROLL TO TOP BUTTON =====
// ==========================================
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
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


// ==========================================
// ===== 7. TOAST & CLIPBOARD LOGIC =====
// ==========================================
function showToast(message, icon = 'info') {
    const toastEl = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');
    
    if(toastEl && toastMessage) {
        toastMessage.textContent = message;
        // Using Bootstrap's native toast API
        const bsToast = new bootstrap.Toast(toastEl, { delay: 3000 });
        bsToast.show();
    }
}

// Copy to Clipboard feature for Skrill/Neteller
document.querySelectorAll('.btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const input = document.getElementById(targetId);
        
        input.select();
        document.execCommand('copy');
        
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span class="material-icons fs-5">check</span>';
        btn.classList.add('bg-success', 'text-white', 'border-success');
        
        showToast('Copied to clipboard!', 'content_copy');
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.classList.remove('bg-success', 'text-white', 'border-success');
        }, 2000);
    });
});


// ==========================================
// ===== 8. EMAILJS CONTACT FORM BACKEND ====
// ==========================================

// Character Counter Logic
const textarea = document.getElementById('message');
const charCount = document.querySelector('.char-count');

if (textarea && charCount) {
    textarea.addEventListener('input', () => {
        const len = textarea.value.length;
        charCount.textContent = `${len}/1000`;
        if(len > 1000) {
            charCount.classList.add('text-danger');
        } else {
            charCount.classList.remove('text-danger');
        }
    });
}

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("jqVskv1gIrhtxzWLj");
    }
})();

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); 

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
            submitBtn.disabled = true;

            // Collect data
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value || "Not provided";
            const service = document.getElementById("service").value;
            const message = document.getElementById("message").value;
            
            const currentTime = new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' });

            const templateParams = {
                name: name,
                email: email,
                title: service,
                time: currentTime,
                message: message + "\n\n--- \nClient Phone: " + phone 
            };

            emailjs.send("service_y5ep5de", "template_hjti01j", templateParams)
                .then(function(response) {
                    console.log("SUCCESS!", response.status, response.text);
                    
                    formMessage.style.display = 'block';
                    formMessage.innerHTML = `
                        <div class="d-flex align-items-center justify-content-center text-success bg-soft-success border border-success rounded p-3">
                            <span class="material-icons me-2">check_circle</span>
                            <span class="fw-semibold">Message sent successfully! We will be in touch shortly.</span>
                        </div>
                    `;
                    
                    contactForm.reset();
                    if(charCount) charCount.textContent = "0/1000";

                }, function(error) {
                    console.error("FAILED...", error);
                    
                    formMessage.style.display = 'block';
                    formMessage.innerHTML = `
                        <div class="d-flex align-items-center justify-content-center text-danger bg-danger bg-opacity-10 border border-danger rounded p-3">
                            <span class="material-icons me-2">error</span>
                            <span class="fw-semibold">Failed to send message. Please check your connection and try again.</span>
                        </div>
                    `;
                })
                .finally(function() {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                        formMessage.innerHTML = '';
                    }, 6000);
                });
        });
    }
});