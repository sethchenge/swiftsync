// ===== CAROUSEL LOGIC =====
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Carousel Setup
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const intervalTime = 5000; 

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        setInterval(nextSlide, intervalTime);
    }

    // 2. Scroll Animation (Fade In Up)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
    
    // 3. Navbar Glass Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(11, 14, 20, 0.98)";
            navbar.style.boxShadow = "0 4px 6px rgba(0,0,0,0.3)";
        } else {
            navbar.style.background = "rgba(11, 14, 20, 0.9)";
            navbar.style.boxShadow = "none";
        }
    });

    // 4. SIDEBAR LOGIC
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
});

// ===== 5. PARTICLE BACKGROUND ANIMATION =====
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
            ctx.fillStyle = 'rgba(0, 229, 255, 0.3)'; // Cyan tint
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
                    // Blue/Cyan connection lines
                    ctx.strokeStyle = `rgba(41, 121, 255, ${0.1 - dist/1500})`;
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
    resize(); 
    initParticles(); 
    animateParticles();
}
// ===== BLOG SCROLL REVEAL =====
// This ensures that new sections like #blog fade in correctly
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Only animate once
                revealObserver.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
});
// ===== 6. ADVANCED MULTI-COLOR TYPEWRITER EFFECT =====
document.addEventListener('DOMContentLoaded', () => {
    const typeTarget = document.getElementById('typewriter');
    
    if (typeTarget) {
        // VS Code Colors
        const colorTag = "#569cd6";    // Cyan/Blue for tags
        const colorText = "#ce9178";   // Orange for text/strings
        
        // Breaking down the code into tokens so the typewriter can color them accurately
        const codeTokens = [
            { text: "<!DOCTYPE html>\n", color: colorTag },
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
// ===== SWIPER PORTFOLIO SLIDER INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
    if (typeof Swiper !== 'undefined') {
        const portfolioSwiper = new Swiper('.portfolioSwiper', {
            slidesPerView: 1, // Show 1 card on mobile
            spaceBetween: 30, // Space between cards
            loop: true,       // Infinite loop
            grabCursor: true, // Shows the "hand" icon to drag
            autoplay: {
                delay: 3500, // Auto-scrolls every 3.5 seconds
                disableOnInteraction: false, // Keeps auto-playing after user swipes
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
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