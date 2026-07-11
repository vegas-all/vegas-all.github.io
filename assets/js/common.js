// Contact Form Handler with mailto
if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link
        const subject = encodeURIComponent(`Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:info@vegas-all.org?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        const formMessage = document.getElementById('formMessage');
        formMessage.textContent = 'Opening your email client... Your message will be sent to info@vegas-all.org';
        formMessage.classList.add('success');
        
        this.reset();
        
        setTimeout(() => {
            formMessage.classList.remove('success');
        }, 5000);
    });
}

// Chat Bot Handler
const chatToggle = document.getElementById('chatToggle');
const chatWidget = document.getElementById('chatWidget');
const chatClose = document.getElementById('chatClose');
const chatSend = document.getElementById('chatSend');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

chatToggle.addEventListener('click', () => {
    chatWidget.classList.toggle('hidden');
});

chatClose.addEventListener('click', () => {
    chatWidget.classList.add('hidden');
});

// Simple AI Bot Responses
const botResponses = {
    'hello': 'Hi there! How can we help you today?',
    'hi': 'Hello! Welcome to Vegas ALL. What can I do for you?',
    'events': 'We host pickleball events throughout Las Vegas! Check our website for upcoming events or ask about specific dates.',
    'mission': 'Our mission is to unite people through sports, outreach, and nourishment. We combat hunger and build community through pickleball.',
    'feeding': 'We operate hunger relief initiatives both locally and internationally. We also run our annual toy and food drive in the Philippines!',
    'pickleball': 'Pickleball is our platform for building social connection, promoting active lifestyles, and turning play into purpose.',
    'contact': 'You can reach us through our contact form or by sending an email to info@vegas-all.org. We\'d love to hear from you!',
    'help': 'I can help you with questions about our mission, events, programs, or how to get involved. What would you like to know?',
    'email': 'You can reach us at info@vegas-all.org',
    'default': 'That\'s a great question! Feel free to contact us at info@vegas-all.org or use our contact form. How else can I help?'
};

function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    for (let key in botResponses) {
        if (message.includes(key)) {
            return botResponses[key];
        }
    }
    return botResponses['default'];
}

function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    // Add user message to chat
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'message user';
    userMsgDiv.innerHTML = `<div class="message-content">${userMessage}</div>`;
    chatMessages.appendChild(userMsgDiv);

    // Clear input
    chatInput.value = '';

    // Simulate bot response delay
    setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        const botMsgDiv = document.createElement('div');
        botMsgDiv.className = 'message bot';
        botMsgDiv.innerHTML = `<div class="message-content">${botResponse}</div>`;
        chatMessages.appendChild(botMsgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});