document.addEventListener('DOMContentLoaded', function() {
    // Animate progress bars when they come into view
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
            const value = bar.getAttribute('aria-valuenow') + '%';
            bar.style.width = value;
        });
    };

    setTimeout(animateProgressBars, 300);

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ✅ Only ONE form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Replace "YOUR_USER_ID" with the Public Key from your EmailJS account
            emailjs.init("L2ox0XHayZovfaJcz");
            
            // Replace "YOUR_SERVICE_ID" with the Service ID from your Email Service
            // Replace "YOUR_TEMPLATE_ID" with the Template ID from your Email Template
            const templateParams = {
                from_name: this.name.value,
                from_email: this.email.value,
                message: this.message.value,
                to_email: "iamsamarthmore@gmail.com"
            };
            
            emailjs.send("service_0iuwuc8", "template_wx48ks1", templateParams)
              .then(() => {
                alert("Message sent successfully!");
                this.reset();
              }, (error) => {
                alert("Failed to send message. Please try again later.");
                console.error(error);
              });
        });
    }
});
