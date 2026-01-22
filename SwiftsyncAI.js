// ===== SWIFTSYNC AI ASSISTANT FUNCTIONALITY =====

// Knowledge Base
const swiftsyncKnowledge = {
    services: {
        'os architecture': 'We provide seamless deployment of Windows, Linux (Ubuntu, Fedora, Kali), and dual-boot environments optimized for zero-latency performance. This includes kernel optimization, driver synchronization, and custom shell configurations.',
        'cybersecurity': 'Our cybersecurity services include proactive threat hunting, firewall architecture, penetration testing, malware elimination, and network hardening to secure your digital perimeter.',
        'cloud': 'We offer enterprise-grade network topology design and cloud integration services for AWS and Azure, including VPN tunneling, server configuration, and cloud migration.',
        'data recovery': 'Advanced forensic data retrieval from damaged drives and corrupted partitions, including partition repair, RAID recovery, and encrypted backups.',
        'hardware': 'Precision hardware upgrades and component diagnostics, from SSD migration to GPU optimization, including component logic, thermal management, and system overclocking.',
        'support': 'Round-the-clock technical troubleshooting with remote debugging, live diagnostics, and priority response for critical system failures.'
    },
    team: {
        'seth chenge': 'Seth Chenge is the Founder & CEO of Swiftsync, with CISCO and AWS elite certifications. He founded the company in 2019 with a vision to democratize enterprise-grade IT solutions.',
        'purity kyalo': 'Purity Kyalo is our Security Lead, specializing in ethical hacking, encryption, and forensics. She ensures your data remains impenetrable.',
        'webster onsando': 'Webster Onsando is our Cloud Architect, AWS certified and focused on scalability, DevOps, and big data solutions.'
    },
    general: {
        'pricing': 'Our pricing is customized based on your specific needs. Contact us for a personalized quote tailored to your project requirements.',
        'contact': 'You can reach us through our contact page or email us directly. We offer both remote and on-site support services.',
        'about': 'Swiftsync was founded in 2019 to synchronize technology with human ambition. We provide world-class IT solutions from Kenya to the world, with 15+ years of combined experience and 500+ successfully deployed projects.',
        'location': 'We are based in Kenya and serve clients worldwide with both remote and on-site services.',
        'experience': 'Our team has 15+ years of combined experience and has successfully deployed 500+ projects with a 100% uptime record.'
    }
};

// DOM Elements
let aiModal, aiTrigger, aiClose, chatArea, userInput, sendBtn, charCount, quickBtns;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initSwiftsyncAI);

function initSwiftsyncAI() {
    // Get or create elements
    aiTrigger = document.getElementById('aiTrigger');
    aiModal = document.getElementById('aiModal');
    
    if (!aiTrigger || !aiModal) {
        console.error('Swiftsync AI: Required elements not found');
        return;
    }
    
    // Load AI interface
    loadAIInterface();
    
    // Event listeners
    aiTrigger.addEventListener('click', openAI);
    
    // Close on overlay click
    aiModal.addEventListener('click', (e) => {
        if (e.target === aiModal) closeAI();
    });
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aiModal.classList.contains('active')) {
            closeAI();
        }
    });
}

function loadAIInterface() {
    aiModal.innerHTML = `
        <div class="ai-modal-content">
            <div class="ai-container">
                <div class="ai-header">
                    <div class="ai-header-left">
                        <div class="ai-avatar">
                            <i class="material-icons">psychology</i>
                            <span class="status-dot"></span>
                        </div>
                        <div class="ai-title">
                            <h3>Swiftsync AI</h3>
                            <span class="ai-status">Online • Ready to assist</span>
                        </div>
                    </div>
                    <button class="ai-close" id="aiClose" aria-label="Close AI Assistant">
                        <i class="material-icons">close</i>
                    </button>
                </div>

                <div class="ai-quick-actions">
                    <button class="quick-btn" data-query="What services does Swiftsync offer?">
                        <i class="material-icons">hub</i>
                        <span>Services</span>
                    </button>
                    <button class="quick-btn" data-query="Tell me about your team">
                        <i class="material-icons">groups</i>
                        <span>Team</span>
                    </button>
                    <button class="quick-btn" data-query="How can I contact you?">
                        <i class="material-icons">contact_mail</i>
                        <span>Contact</span>
                    </button>
                    <button class="quick-btn" data-query="What are your pricing options?">
                        <i class="material-icons">paid</i>
                        <span>Pricing</span>
                    </button>
                </div>

                <div class="ai-chat-area" id="chatArea">
                    <div class="ai-welcome">
                        <div class="welcome-icon">
                            <i class="material-icons">rocket_launch</i>
                        </div>
                        <h4>Welcome to Swiftsync AI</h4>
                        <p>Your intelligent assistant for all things Swiftsync. Ask me about our services, team, or how we can help transform your IT infrastructure.</p>
                    </div>
                </div>

                <div class="ai-input-area">
                    <div class="input-wrapper">
                        <textarea 
                            id="userInput" 
                            placeholder="Ask about services, pricing, support..." 
                            rows="1"
                            maxlength="500"
                        ></textarea>
                        <button class="send-btn" id="sendBtn" aria-label="Send message">
                            <i class="material-icons">send</i>
                        </button>
                    </div>
                    <div class="input-footer">
                        <span class="char-count"><span id="charCount">0</span>/500</span>
                        <span class="ai-badge">Powered by Swiftsync Neural Engine</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Re-initialize elements after loading interface
    setTimeout(initAIElements, 100);
}

function initAIElements() {
    aiClose = document.getElementById('aiClose');
    chatArea = document.getElementById('chatArea');
    userInput = document.getElementById('userInput');
    sendBtn = document.getElementById('sendBtn');
    charCount = document.getElementById('charCount');
    quickBtns = document.querySelectorAll('.quick-btn');
    
    if (aiClose) aiClose.addEventListener('click', closeAI);
    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (userInput) {
        userInput.addEventListener('input', handleInput);
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            userInput.value = query;
            sendMessage();
        });
    });
}

function openAI() {
    aiModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (userInput) userInput.focus();
}

function closeAI() {
    aiModal.classList.remove('active');
    document.body.style.overflow = '';
}

function handleInput() {
    const length = userInput.value.length;
    charCount.textContent = length;
    
    // Auto-grow textarea
    userInput.style.height = 'auto';
    userInput.style.height = userInput.scrollHeight + 'px';
}

function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    userInput.value = '';
    charCount.textContent = '0';
    userInput.style.height = 'auto';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate response
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateResponse(message);
        addMessage(response, 'ai');
    }, 1500);
}

// MODIFIED: Function to add message with typing effect for AI
function addMessage(text, type) {
    // Remove welcome message if exists
    const welcome = chatArea.querySelector('.ai-welcome');
    if (welcome) welcome.remove();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    
    const time = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // If it's the User, show text immediately.
    // If it's AI, leave it empty initially for the typing effect.
    const content = type === 'user' ? text : '';
    
    messageDiv.innerHTML = `
        <div class="message-avatar ${type}">
            <i class="material-icons">${type === 'ai' ? 'psychology' : 'person'}</i>
        </div>
        <div class="message-content">
            <div class="message-bubble ${type}">
                ${content}
            </div>
            <span class="message-time">${time}</span>
        </div>
    `;
    
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;

    // Trigger typing effect ONLY if it is an AI message
    if (type === 'ai') {
        const bubble = messageDiv.querySelector('.message-bubble');
        typeWriter(bubble, text, 0);
    }
}

// NEW HELPER: Recursive function for typing animation
function typeWriter(element, text, index) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        chatArea.scrollTop = chatArea.scrollHeight; // Keep scrolling down as text grows
        setTimeout(() => typeWriter(element, text, index + 1), 20); // Adjust speed (20ms) here
    }
}

function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = `
        <div class="message-avatar ai">
            <i class="material-icons">psychology</i>
        </div>
        <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    chatArea.appendChild(indicator);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function generateResponse(query) {
    const lowerQuery = query.toLowerCase();
    
    // Check services
    for (const [key, value] of Object.entries(swiftsyncKnowledge.services)) {
        if (lowerQuery.includes(key)) {
            return value;
        }
    }
    
    // Check team
    for (const [key, value] of Object.entries(swiftsyncKnowledge.team)) {
        if (lowerQuery.includes(key)) {
            return value;
        }
    }
    
    // Check general questions
    for (const [key, value] of Object.entries(swiftsyncKnowledge.general)) {
        if (lowerQuery.includes(key)) {
            return value;
        }
    }
    
    // Service-related keywords
    if (lowerQuery.includes('service') || lowerQuery.includes('offer') || lowerQuery.includes('do')) {
        return "Swiftsync offers comprehensive IT solutions including OS Architecture, Cybersecurity, Cloud & Network Services, Data Recovery, Hardware Operations, and 24/7 Intel Support. Which service would you like to know more about?";
    }
    
    // Team-related
    if (lowerQuery.includes('team') || lowerQuery.includes('who') || lowerQuery.includes('staff')) {
        return "Our team consists of Seth Chenge (Founder & CEO), Purity Kyalo (Security Lead), and Webster Onsando (Cloud Architect). Together we bring 15+ years of experience and have deployed 500+ successful projects. Would you like to know more about any team member?";
    }
    
    // Contact-related
    if (lowerQuery.includes('contact') || lowerQuery.includes('reach') || lowerQuery.includes('email')) {
        return "You can contact us through our contact page or reach out directly via email. We provide both remote and on-site support. Would you like to schedule a consultation?";
    }
    
    // Default response
    return "I'm here to help you learn about Swiftsync's services, team, and how we can assist with your IT needs. Feel free to ask about our OS architecture, cybersecurity solutions, cloud services, or anything else!";
}

// Auto-initialize if elements exist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSwiftsyncAI);
} else {
    initSwiftsyncAI();
}