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
// ===== PAGE PRELOADER LOGIC =====
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // We add a tiny 500ms delay so the user gets a glimpse of the cool animation 
        // even if the page loads instantly.
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
            
            // Completely remove it from the DOM after the fade transition completes (600ms)
            setTimeout(() => {
                preloader.remove();
            }, 600);
        }, 500); 
    }
});
// ===== SCROLL TO TOP BUTTON LOGIC =====
document.addEventListener("DOMContentLoaded", () => {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    
    if (scrollTopBtn) {
        // 1. Show/Hide button based on scroll position
        window.addEventListener("scroll", () => {
            // If user scrolls down more than 300 pixels, show the button
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add("show");
            } else {
                scrollTopBtn.classList.remove("show");
            }
        });

        // 2. Smooth scroll to top when clicked
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
// ===== BULLETPROOF PAGE PRELOADER LOGIC =====
function removePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
            setTimeout(() => {
                preloader.remove();
            }, 600);
        }, 1200); 
    }
}

if (document.readyState === 'complete') {
    removePreloader();
} else {
    window.addEventListener('load', removePreloader);
}

// ===== SCROLL TO TOP BUTTON LOGIC =====
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
});




// ==========================================
// ===== EMAILJS CONTACT FORM BACKEND =======
// ==========================================

// 1. Initialize EmailJS with your Public Key
(function() {
    emailjs.init("jqVskv1gIrhtxzWLj");
})();

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Stops the page from refreshing

            // Get the submit button so we can change its text to "Sending..."
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';
            submitBtn.disabled = true;

            // Collect the data typed into the form
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const service = document.getElementById("service").value;
            const message = document.getElementById("message").value;
            
            // Get the current time for your {{time}} variable in the template
            const currentTime = new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' });

            // Package the data exactly how your EmailJS template expects it
            const templateParams = {
                name: name,
                email: email,
                title: service, // Maps to your {{title}} in the Subject line
                time: currentTime, // Maps to {{time}} in the body
                // Adding the phone number to the message just in case you need to call them back!
                message: message + "\n\n--- \nClient Phone: " + phone 
            };

            // Send it using your Service ID and Template ID
            emailjs.send("service_y5ep5de", "template_hjti01j", templateParams)
                .then(function(response) {
                    console.log("SUCCESS!", response.status, response.text);
                    
                    // Show a glowing green success message
                    formMessage.innerHTML = `
                        <div class="alert alert-success d-flex align-items-center mt-3" style="background: rgba(37, 211, 102, 0.1); border: 1px solid #25d366; color: #25d366;">
                            <span class="material-icons me-2">check_circle</span>
                            <div>Message sent successfully! We will get back to you shortly.</div>
                        </div>
                    `;
                    
                    // Clear the form
                    contactForm.reset();

                }, function(error) {
                    console.error("FAILED...", error);
                    
                    // Show a red error message if something goes wrong
                    formMessage.innerHTML = `
                        <div class="alert alert-danger d-flex align-items-center mt-3" style="background: rgba(245, 0, 87, 0.1); border: 1px solid #f50057; color: #f50057;">
                            <span class="material-icons me-2">error</span>
                            <div>Failed to send the message. Please try checking your internet connection.</div>
                        </div>
                    `;
                })
                .finally(function() {
                    // Turn the button back to normal whether it succeeded or failed
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Make the alert message disappear after 6 seconds
                    setTimeout(() => {
                        formMessage.innerHTML = '';
                    }, 6000);
                });
        });
    }
});