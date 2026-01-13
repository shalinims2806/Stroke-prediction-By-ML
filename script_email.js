
// --- Contact Form Email Handling (EmailJS) ---
const contactForm = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const originalBtnText = sendBtn.innerText;
        sendBtn.innerText = 'Sending...';

        // IMPORTANT: You must sign up at https://www.emailjs.com/
        // 1. Create a "Service" (e.g., Gmail) -> Get Service ID
        // 2. Create a "Template" -> Get Template ID
        //    - Put specific text in template:
        //      "Hello Shalini, You have received a new message... Name: {{user_name}}..."
        // 3. Get Public Key from Account settings
        // 4. Replace placeholders below:

        const serviceID = 'YOUR_SERVICE_ID';
        const templateID = 'YOUR_TEMPLATE_ID';

        // NOTE: Since we don't have real keys, we will SIMULATE success for the demo.
        // Uncomment the block below when you have real keys.

        /*
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                alert('Message Sent Successfully! Thank you.');
                sendBtn.innerText = originalBtnText;
                contactForm.reset();
            }, (err) => {
                alert('Failed to send. Please check console.');
                sendBtn.innerText = originalBtnText;
                console.error(err);
            });
        */

        // DEMO SIMULATION
        setTimeout(() => {
            alert(`DEMO: Email Sent!\n\nTo Shalini:\n"Hello Shalini, New message from ${document.getElementById('user_name').value}..."\n\nTo User:\n"Thank you for contacting..."`);
            sendBtn.innerText = originalBtnText;
            contactForm.reset();
        }, 1500);
    });
}
});
