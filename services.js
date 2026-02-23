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
        const mainText = "elcome to Swiftsync Modern Tech services, we are ready to get started.";
        textContainer.innerHTML = ""; // Clear existing text
        
        // Split text into individual spans for character-level control
        const chars = [];
        for (let i = 0; i < mainText.length; i++) {
            let char = mainText[i];
            let span = document.createElement("span");
            // Inline-block is required to animate transforms (rotation, y-axis)
            span.style.display = "inline-block"; 
            span.innerHTML = char === " " ? "&nbsp;" : char;
            textContainer.appendChild(span);
            chars.push(span);
        }

        // Make the parent container relative so we can position the flowers inside it
        const welcomeSection = document.getElementById("welcome-text-container");
        welcomeSection.style.position = "relative";

        // 3. Drop characters from the top as they "type"
        gsap.fromTo(chars, 
            { 
                y: -60, 
                opacity: 0, 
                rotationX: -90 // Start slightly flipped up
            }, 
            { 
                y: 0, 
                opacity: 1, 
                rotationX: 0,
                duration: 0.5, 
                stagger: 0.04, // This creates the "typing" delay between each character
                ease: "back.out(1.5)",
                delay: 0.5,
                onComplete: () => {
                    // Hide the typing cursor
                    const cursor = document.querySelector('.cursor');
                    if(cursor) cursor.style.display = 'none';
                    
                    // Trigger the Flower Burst and Continuous Animations
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
                particle.style.fontSize = (Math.random() * 1.5 + 1) + "rem"; // Random size
                particle.style.pointerEvents = "none";
                particle.style.zIndex = "100";
                container.appendChild(particle);

                // Animate outwards and fade out over 1 second
                gsap.fromTo(particle,
                    { x: 0, y: 0, opacity: 1, scale: 0 },
                    {
                        x: (Math.random() - 0.5) * 400, // Explode outwards horizontally
                        y: (Math.random() - 0.5) * 300 - 50, // Explode outwards and slightly upwards
                        opacity: 0,
                        scale: Math.random() * 1.5 + 0.5,
                        rotation: Math.random() * 360,
                        duration: 1 + Math.random() * 0.5, // Around 1 to 1.5 seconds
                        ease: "power3.out",
                        onComplete: () => particle.remove() // Clean up DOM after animation
                    }
                );
            }
        }

        // 5. Function to start the spinning and flipping animations
        function startContinuousAnimations(characterElements) {
            characterElements.forEach((span, index) => {
                if (span.innerHTML === "&nbsp;") return; // Skip spaces

                // Apply premium, varied animations based on the character's index
                if (index % 5 === 0) {
                    // Flip Top to Bottom (rotationX)
                    gsap.to(span, { 
                        rotationX: 360, 
                        duration: 2, 
                        repeat: -1, 
                        repeatDelay: 1.5, // Pause before flipping again to make it look premium
                        ease: "power2.inOut", 
                        delay: index * 0.05 
                    });
                } else if (index % 5 === 2) {
                    // Spin like a wheel (rotation)
                    gsap.to(span, { 
                        rotation: 360, 
                        duration: 2, 
                        repeat: -1, 
                        repeatDelay: 2, 
                        ease: "back.inOut(1.2)", 
                        delay: index * 0.05 
                    });
                } else if (index % 5 === 4) {
                    // Gentle glowing float
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
                // The remaining characters stay still to anchor the text and keep it readable!
            });
        }

    } else {
        console.warn("GSAP is not loaded. Ensure the CDN link is in the <head>.");
    }
});