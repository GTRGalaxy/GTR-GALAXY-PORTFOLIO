// ============ NAVBAR SCROLL EFFECT ============
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // ============ INTERSECTION OBSERVER FOR ANIMATIONS ============
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.service-card, .benefit-box, .process-step, .city-badge, .material-item, .testimonial-card').forEach(el => {
            observer.observe(el);
        });

        // ============ COUNTER ANIMATION ============
        function animateCounter() {
            const counters = document.querySelectorAll('.stat-number span');
            const duration = 2000;

            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                
                // Skip if target is not a valid number
                if (isNaN(target)) return;
                
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
            });
        }

        // Trigger counter animation when hero is in view
        const heroSection = document.querySelector('.hero');
        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounter();
                heroObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });

        heroObserver.observe(heroSection);

        // ============ FORM SUBMISSION ============
        const form = document.getElementById('partnershipForm');
        const formMessage = document.getElementById('form-message');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.querySelector('.form-submit');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            formMessage.style.display = 'none';

            try {
                const formData = new FormData(form);
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    formMessage.style.display = 'block';
                    formMessage.style.background = '#d4edda';
                    formMessage.style.color = '#155724';
                    formMessage.style.border = '1px solid #c3e6cb';
                    formMessage.innerHTML = '✅ Thank you! Your partnership request has been submitted successfully. We will contact you within 24 hours.';
                    form.reset();
                } else {
                    throw new Error(data.message || 'Form submission failed');
                }
            } catch (error) {
                formMessage.style.display = 'block';
                formMessage.style.background = '#f8d7da';
                formMessage.style.color = '#721c24';
                formMessage.style.border = '1px solid #f5c6cb';
                formMessage.innerHTML = '❌ Error: ' + error.message + '. Please try again or contact us directly at 9100520120.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Partnership Request';
            }
        });

        // ============ SMOOTH SCROLL ============
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });