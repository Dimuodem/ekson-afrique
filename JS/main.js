/* ============================================
   Ekson Afrique - Main JavaScript
   ============================================ */

// ---------- Mobile Hamburger Menu ----------
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });
    }

    // ---------- Back to Top ----------
    const backTop = document.getElementById('backTop');
    if (backTop) {
        backTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---------- Animated Counters (Intersection Observer) ----------
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count);
                    let current = 0;
                    const increment = target / 80;

                    const timer = setInterval(function() {
                        current += increment;
                        if (current >= target) {
                            el.textContent = target + (target === 98 ? '%' : '');
                            clearInterval(timer);
                        } else {
                            el.textContent = Math.floor(current) + (target === 98 ? '%' : '');
                        }
                    }, 20);

                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function(c) {
            observer.observe(c);
        });
    }

    // ---------- Dark Mode Toggle ----------
    const darkToggle = document.getElementById('darkToggle');
    if (darkToggle) {
        darkToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        });
    }

    // ---------- Active Navigation Link ----------
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-links a');
    navLinksAll.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        } else if (currentPage === '' && href === 'index.html') {
            link.classList.add('active');
        }
    });
});