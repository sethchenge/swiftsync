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
// ===== 4. SCROLL REVEAL & COUNTERS =====
// ==========================================
const observerOptions = { 
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

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

document.querySelectorAll('.reveal, .scroll-reveal').forEach(el => observer.observe(el));

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

// ==========================================
// ===== 5. GSAP PREMIUM TEXT ANIMATION =====
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    
    // Make sure GSAP is loaded
    if (typeof gsap !== "undefined") {
        
        // 1. Infinite Flip Animation for Drop Cap 'W'
        gsap.to("#drop-w", {
            rotationY: 360,
            duration: 3,
            repeat: -1,
            ease: "none",
            transformOrigin: "center center"
        });

        // 2. Setup the text for the dropping/typing effect
        const textContainer = document.getElementById("auto-type-text");
        if(textContainer) {
            const mainText = "elcome to Swiftsync Modern Tech <br> services.";
            textContainer.innerHTML = ""; 
            
            const chars = [];
            const words = mainText.split(" ");
            
            words.forEach((word, wordIndex) => {
                if (word === "<br>") {
                    let br = document.createElement("br");
                    textContainer.appendChild(br);
                    return; 
                }
                
                let wordSpan = document.createElement("span");
                wordSpan.style.display = "inline-block";
                wordSpan.style.whiteSpace = "nowrap"; 
                
                for (let i = 0; i < word.length; i++) {
                    let charSpan = document.createElement("span");
                    charSpan.style.display = "inline-block";
                    charSpan.innerHTML = word[i];
                    wordSpan.appendChild(charSpan);
                    chars.push(charSpan);
                }
                
                textContainer.appendChild(wordSpan);
                
                if (wordIndex < words.length - 1 && words[wordIndex + 1] !== "<br>") {
                    let spaceSpan = document.createElement("span");
                    spaceSpan.innerHTML = "&nbsp;";
                    textContainer.appendChild(spaceSpan);
                    chars.push(spaceSpan); 
                }
            });

            const welcomeSection = document.getElementById("welcome-text-container");
            welcomeSection.style.position = "relative";

            // 3. Drop characters from the top as they "type"
            gsap.fromTo(chars, 
                { y: -60, opacity: 0, rotationX: -90 }, 
                { 
                    y: 0, 
                    opacity: 1, 
                    rotationX: 0,
                    duration: 0.5, 
                    stagger: 0.04, 
                    ease: "back.out(1.5)",
                    delay: 0.5,
                    onComplete: () => {
                        const cursor = document.querySelector('.typed-cursor') || document.querySelector('.cursor');
                        if(cursor) cursor.style.display = 'none';
                        startContinuousAnimations(chars);
                    }
                }
            );

            // 4. Function to start the spinning and flipping animations (Adjusted for Light Theme)
            function startContinuousAnimations(characterElements) {
                characterElements.forEach((span, index) => {
                    if (span.innerHTML === "&nbsp;") return; 

                    if (index % 5 === 0) {
                        gsap.to(span, { 
                            rotationX: 360, 
                            duration: 2, 
                            repeat: -1, 
                            repeatDelay: 1.5, 
                            ease: "power2.inOut", 
                            delay: index * 0.05 
                        });
                    } else if (index % 5 === 2) {
                        gsap.to(span, { 
                            rotation: 360, 
                            duration: 2, 
                            repeat: -1, 
                            repeatDelay: 2, 
                            ease: "back.inOut(1.2)", 
                            delay: index * 0.05 
                        });
                    } else if (index % 5 === 4) {
                        gsap.to(span, { 
                            y: -6, 
                            color: "#635bff", // Stripe Blurple
                            textShadow: "0 4px 10px rgba(99, 91, 255, 0.3)", // Soft premium shadow instead of neon
                            duration: 1.5, 
                            repeat: -1, 
                            yoyo: true, 
                            ease: "sine.inOut", 
                            delay: index * 0.05 
                        });
                    }
                });
            }
        }
    } else {
        console.warn("GSAP is not loaded. Ensure the CDN link is in the <head>.");
    }
});

// ==========================================
// ===== 6. MARQUEE INFINITE SCROLL =====
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("sectors-track");
    if (track) {
        const items = track.innerHTML;
        track.innerHTML = items + items; // Duplicate for seamless infinite scrolling
    }
});

// ==========================================
// ===== 7. MOBILE SIDEBAR LOGIC =====
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
// ===== 8. SCROLL TO TOP BUTTON =====
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