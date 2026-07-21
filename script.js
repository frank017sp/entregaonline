document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth Scrolling
    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // 2. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-btn');
        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(other => other.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // 3. Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        });
    }, revealOptions);
    revealElements.forEach(el => revealOnScroll.observe(el));

    // 4. Number Counter Animation for Earnings
    const counterElement = document.querySelector('.count-up');
    let counted = false;
    if (counterElement) {
        const target = parseInt(counterElement.getAttribute('data-target'), 10);
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    let current = 0;
                    const increment = target / 80;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            clearInterval(timer);
                            current = target;
                        }
                        counterElement.textContent = 'R$ ' + Math.floor(current).toLocaleString('pt-BR');
                    }, 25);
                }
            });
        }, { threshold: 0.5 });
        countObserver.observe(counterElement);
    }
    
    // 5. Cinematic Particles Generation
    function createParticles(containerId, count) {
        const container = document.getElementById(containerId);
        if (!container) return;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animation = `float-particle ${Math.random() * 10 + 5}s infinite linear`;
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            container.appendChild(particle);
        }
    }
    createParticles('hero-particles', 30);
    createParticles('final-particles', 20);

    // Dynamic Style for Particles
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes float-particle {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 0.6; }
        90% { opacity: 0.6; }
        100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
      }
    `;
    document.head.appendChild(styleSheet);

    // 6. Parallax Effect on Scroll
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    window.addEventListener('scroll', () => {
        let scrollY = window.scrollY;
        parallaxLayers.forEach(layer => {
            const speed = layer.getAttribute('data-speed') || 0.05;
            layer.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // 7. VSL Delay Logic (Conteúdo sempre visível)
    const delayedContent = document.getElementById('delayed-content');
    if (delayedContent) {
        delayedContent.style.display = 'block';
        delayedContent.style.opacity = '1';
    }

    // 8. Video Click Toggle removido para evitar conflitos com controles nativos
    const vslVideo = document.getElementById('vsl-video');
    if (vslVideo) {
        // Native controls handling play/pause and volume now.
    }
});
