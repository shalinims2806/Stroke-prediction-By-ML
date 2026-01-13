document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    if (mobileMenuBtn && navList) {
        mobileMenuBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
            });
        });
    }

    // --- Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Typo animation effect ---
    const textElement = document.querySelector('.typing-text');
    const texts = ['Zoho Developer', 'Freelancer', 'Java Full-Stack', 'Analyst'];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';

    (function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        if (textElement) {
            textElement.textContent = letter;
        }

        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); // 2s wait
        } else {
            setTimeout(type, 100);
        }
    })();

    // --- Custom Cursor Logic REMOVED ---

    // --- Simple Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.project-card, .edu-card, .skills-category');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.8;

        revealElements.forEach(box => {
            const boxTop = box.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                box.style.opacity = '1';
                box.style.transform = 'translateY(0)';
            }
        });
    };

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- Contact Form Email Handling (EmailJS) ---
    const contactForm = document.getElementById('contact-form');
    const sendBtn = document.getElementById('send-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const originalBtnText = sendBtn.innerText;
            sendBtn.innerText = 'Sending...';

            const serviceID = 'service_j3jl3nu';
            const templateID = 'template_k55c9pq';
            // Public key: 'P6Buo2tYb9aTCFyJg'
            const publicKey = 'P6Buo2tYb9aTCFyJg';

            // Retrieve values
            const nameVal = document.getElementById('user_name').value;
            const emailVal = document.getElementById('user_email').value;
            const msgVal = document.getElementById('message').value;

            // Combine sender details into the message body so the receiver DEFINITELY sees them
            const combinedMessage = `Sender Name: ${nameVal}\nSender Email: ${emailVal}\n\nMessage:\n${msgVal}`;

            const params = {
                // Shotgun approach: sending all possible variable names to catch what the template needs
                from_name: nameVal,
                user_name: nameVal,
                name: nameVal,
                sender_name: nameVal,

                to_name: "Shalini",
                to_email: "shalinims2806@gmail.com", // Explict owner email if template uses {{to_email}}

                message: combinedMessage, // The crucial part

                reply_to: emailVal,
                user_email: emailVal,
                email: emailVal
            };

            emailjs.send(serviceID, templateID, params, publicKey)
                .then(() => {
                    alert('Message Sent Successfully! Thank you.');
                    sendBtn.innerText = originalBtnText;
                    contactForm.reset();
                }, (err) => {
                    alert('Failed to send. Error Details: ' + JSON.stringify(err, null, 2));
                    console.error('EmailJS Error:', err);
                    sendBtn.innerText = originalBtnText;
                });
        });
    }
});