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
// ===== 3. HERO CAROUSEL LOGIC =====
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const intervalTime = 6000; // 6 seconds

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        setInterval(nextSlide, intervalTime);
    }
});

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
// ===== 5. SCROLL REVEAL ANIMATIONS =====
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

document.querySelectorAll('.reveal, .scroll-reveal').forEach(el => observer.observe(el));


// ==========================================
// ===== 6. MOBILE SIDEBAR LOGIC =====
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
// ===== 7. LIGHT MODE TYPEWRITER EFFECT =====
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const typeTarget = document.getElementById('typewriter');
    
    if (typeTarget) {
        // Premium Light Mode IDE Colors (e.g., GitHub Light / VS Code Light)
        const colorTag = "#22863a";    // Green for HTML tags
        const colorText = "#24292e";   // Dark slate for regular text
        const colorBracket = "#005cc5"; // Blue for brackets
        
        const codeTokens = [
            { text: "<!DOCTYPE html>\n", color: colorBracket },
            { text: "<html>\n", color: colorTag },
            { text: "  <head>\n", color: colorTag },
            { text: "    <title>", color: colorTag },
            { text: "Swiftsync Engine", color: colorText },
            { text: "</title>\n", color: colorTag },
            { text: "  </head>\n", color: colorTag },
            { text: "  <body>\n", color: colorTag },
            { text: "    <header>\n", color: colorTag },
            { text: "      <h1>", color: colorTag },
            { text: "Architecting the Future", color: colorText },
            { text: "</h1>\n", color: colorTag },
            { text: "    </header>\n", color: colorTag },
            { text: "    <main>\n", color: colorTag },
            { text: "      <p>", color: colorTag },
            { text: "Clean code. Scalable infrastructure.", color: colorText },
            { text: "</p>\n", color: colorTag },
            { text: "      <button>", color: colorTag },
            { text: "Initialize Build", color: colorText },
            { text: "</button>\n", color: colorTag },
            { text: "    </main>\n", color: colorTag },
            { text: "  </body>\n", color: colorTag },
            { text: "</html>", color: colorTag }
        ];

        let currentTokenIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 50;

        function renderHTML() {
            let displayHTML = "";
            
            // Render fully completed tokens
            for(let j = 0; j < currentTokenIndex; j++) {
                let text = codeTokens[j].text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                displayHTML += `<span style="color: ${codeTokens[j].color};">${text}</span>`;
            }
            
            // Render the token currently being typed
            if (currentTokenIndex < codeTokens.length) {
                let currentText = codeTokens[currentTokenIndex].text.substring(0, currentCharIndex);
                currentText = currentText.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                displayHTML += `<span style="color: ${codeTokens[currentTokenIndex].color};">${currentText}</span>`;
            }
            
            typeTarget.innerHTML = displayHTML;
        }

        function typeWriter() {
            if (!isDeleting) {
                if (currentTokenIndex < codeTokens.length) {
                    currentCharIndex++;
                    renderHTML();
                    
                    if (currentCharIndex >= codeTokens[currentTokenIndex].text.length) {
                        currentCharIndex = 0;
                        currentTokenIndex++;
                    }
                    
                    typingSpeed = Math.random() * 40 + 15; // Natural variable typing speed
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    // Finished typing, pause before deleting
                    isDeleting = true;
                    currentTokenIndex = codeTokens.length - 1;
                    currentCharIndex = codeTokens[currentTokenIndex].text.length;
                    setTimeout(typeWriter, 5000); 
                }
            } else {
                if (currentTokenIndex >= 0) {
                    currentCharIndex--;
                    renderHTML();
                    
                    if (currentCharIndex < 0) {
                        currentTokenIndex--;
                        if (currentTokenIndex >= 0) {
                            currentCharIndex = codeTokens[currentTokenIndex].text.length;
                        }
                    }
                    
                    typingSpeed = 10; // Delete very fast
                    setTimeout(typeWriter, typingSpeed);
                } else {
                    // Finished deleting, pause before typing again
                    isDeleting = false;
                    currentTokenIndex = 0;
                    currentCharIndex = 0;
                    setTimeout(typeWriter, 1000);
                }
            }
        }
        
        // Start animation after slight delay
        setTimeout(typeWriter, 1500);
    }
});


// ==========================================
// ===== 8. SCROLL TO TOP BUTTON LOGIC =====
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
});


// ==========================================
// ===== 9. SWIPER PORTFOLIO SLIDER =====
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    if (typeof Swiper !== 'undefined') {
        const portfolioSwiper = new Swiper('.portfolioSwiper', {
            slidesPerView: 1, // Show 1 card on mobile
            spaceBetween: 30, // Space between cards
            loop: true,       // Infinite loop
            grabCursor: true, // Shows the "hand" icon to drag
            autoplay: {
                delay: 4000, // Auto-scrolls every 4 seconds
                disableOnInteraction: false, // Keeps auto-playing after user swipes
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // When window width is >= 768px (Tablets)
                768: {
                    slidesPerView: 2,
                },
                // When window width is >= 992px (Desktop)
                992: {
                    slidesPerView: 3,
                }
            }
        });
    }
});