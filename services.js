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
// ===== PREMIUM GSAP WELCOME TEXT ANIMATION LOGIC =====
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
        
        // Added <br> tag before "services." to force it to the next line
        const mainText = "elcome to Swiftsync Modern Tech <br> services.";
        textContainer.innerHTML = ""; 
        
        const chars = [];
        const words = mainText.split(" ");
        
        words.forEach((word, wordIndex) => {
            // Check if the word is our line-break trigger
            if (word === "<br>") {
                let br = document.createElement("br");
                textContainer.appendChild(br);
                return; // Skip standard processing for the line break
            }
            
            // Wrapper for the word to prevent breaking mid-word
            let wordSpan = document.createElement("span");
            wordSpan.style.display = "inline-block";
            wordSpan.style.whiteSpace = "nowrap"; 
            
            // Add characters to the word
            for (let i = 0; i < word.length; i++) {
                let charSpan = document.createElement("span");
                charSpan.style.display = "inline-block";
                charSpan.innerHTML = word[i];
                wordSpan.appendChild(charSpan);
                chars.push(charSpan);
            }
            
            textContainer.appendChild(wordSpan);
            
            // Add a space after the word (unless it's the last word OR the next word is a line break)
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
            { 
                y: -60, 
                opacity: 0, 
                rotationX: -90 
            }, 
            { 
                y: 0, 
                opacity: 1, 
                rotationX: 0,
                duration: 0.5, 
                stagger: 0.04, 
                ease: "back.out(1.5)",
                delay: 0.5,
                onComplete: () => {
                    const cursor = document.querySelector('.cursor');
                    if(cursor) cursor.style.display = 'none';
                    
                    createFlowerBurst(welcomeSection);
                    startContinuousAnimations(chars);
                }
            }
        );

        // --- CUSTOM FUNCTIONS ---

        // 4. Function to create the Flower Burst
        function createFlowerBurst(container) {
            const symbols = ["🌸", "🌺", "🌼", "✨", "💫"];
            
            for (let i = 0; i < 25; i++) {
                let particle = document.createElement("div");
                particle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
                particle.style.position = "absolute";
                particle.style.left = "50%";
                particle.style.top = "50%";
                particle.style.fontSize = (Math.random() * 1.5 + 1) + "rem"; 
                particle.style.pointerEvents = "none";
                particle.style.zIndex = "100";
                container.appendChild(particle);

                gsap.fromTo(particle,
                    { x: 0, y: 0, opacity: 1, scale: 0 },
                    {
                        x: (Math.random() - 0.5) * 400, 
                        y: (Math.random() - 0.5) * 300 - 50, 
                        opacity: 0,
                        scale: Math.random() * 1.5 + 0.5,
                        rotation: Math.random() * 360,
                        duration: 1 + Math.random() * 0.5, 
                        ease: "power3.out",
                        onComplete: () => particle.remove() 
                    }
                );
            }
        }

        // 5. Function to start the spinning and flipping animations
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
                        color: "#00e5ff", 
                        textShadow: "0 0 10px rgba(0, 229, 255, 0.8)",
                        duration: 1.5, 
                        repeat: -1, 
                        yoyo: true, 
                        ease: "sine.inOut", 
                        delay: index * 0.05 
                    });
                }
            });
        }

    } else {
        console.warn("GSAP is not loaded. Ensure the CDN link is in the <head>.");
    }
});

// ===== OVAL CAROUSEL INFINITE SCROLL LOGIC =====
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("sectors-track");
    
    if (track) {
        const items = track.innerHTML;
        track.innerHTML = items + items;
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