// ── MOBILE MENU TOGGLE ──────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const mobileNav  = document.getElementById('mobileNav');

menuToggle?.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    menuToggle.classList.toggle('active');
});

// Close mobile nav when a link is clicked
mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('active');
    });
});

// ── SMOOTH SCROLL WITH OFFSET ───────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (!target) return;

        mobileNav?.classList.remove('open');
        menuToggle?.classList.remove('active');

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ── ACTIVE NAV LINK HIGHLIGHT ───────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a[href^="#"], .mobile-nav a[href^="#"]');
const navH = () => parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.toggle(
                    'active',
                    link.getAttribute('href') === `#${entry.target.id}`
                );
            });
        }
    });
}, {
    rootMargin: `-${navH() + 10}px 0px -60% 0px`,
    threshold: 0
});

sections.forEach(s => observer.observe(s));

// ── HEADER SCROLL SHADOW ────────────────────────────────────────
const header = document.getElementById('site-header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    // Enhanced shadow on scroll
    if (scrollY > 10) {
        header.style.boxShadow = '0 4px 30px rgba(100,60,100,.12)';
        header.style.background = 'rgba(253, 246, 240, 0.88)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(100,60,100,.06)';
        header.style.background = 'rgba(253, 246, 240, 0.72)';
    }
    
    lastScrollY = scrollY;
}, { passive: true });

// ── SECTION ENTRANCE ANIMATION ──────────────────────────────────
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.06 });

document.querySelectorAll('section').forEach(s => {
    s.style.animationPlayState = 'paused';
    sectionObserver.observe(s);
});

// ── SCROLL TO TOP BUTTON ────────────────────────────────────────
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn?.classList.add('visible');
    } else {
        scrollTopBtn?.classList.remove('visible');
    }
}, { passive: true });

scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── TYPEWRITER EFFECT ───────────────────────────────────────────
const heroTag = document.getElementById('heroTag');

if (heroTag) {
    const fullText = heroTag.textContent.trim();
    heroTag.textContent = '';
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    heroTag.appendChild(cursor);
    
    let charIndex = 0;
    const typeSpeed = 50;
    const startDelay = 800;
    
    function typeChar() {
        if (charIndex < fullText.length) {
            // Insert text before cursor
            const textNode = document.createTextNode(fullText[charIndex]);
            heroTag.insertBefore(textNode, cursor);
            charIndex++;
            setTimeout(typeChar, typeSpeed);
        } else {
            // Remove cursor after a pause
            setTimeout(() => {
                cursor.style.animation = 'none';
                cursor.style.opacity = '0';
                cursor.style.transition = 'opacity 0.5s ease';
            }, 2000);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeChar, startDelay);
}

// ── PARALLAX BACKGROUND BLOBS ───────────────────────────────────
const blobs = document.querySelectorAll('.blob');

if (blobs.length > 0 && window.matchMedia('(min-width: 768px)').matches) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
    
    function animateBlobs() {
        // Smooth interpolation
        currentX += (mouseX - currentX) * 0.03;
        currentY += (mouseY - currentY) * 0.03;
        
        blobs.forEach((blob, i) => {
            const factor = (i + 1) * 12;
            const x = currentX * factor;
            const y = currentY * factor;
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        requestAnimationFrame(animateBlobs);
    }
    
    animateBlobs();
}

// ── SKILL TAG STAGGER ANIMATION ─────────────────────────────────
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll('.skill-tag');
            tags.forEach((tag, i) => {
                tag.style.opacity = '0';
                tag.style.transform = 'translateY(10px)';
                tag.style.transition = `all 0.4s ease ${i * 0.06}s`;
                
                requestAnimationFrame(() => {
                    tag.style.opacity = '1';
                    tag.style.transform = 'translateY(0)';
                });
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

console.log('Portfolio loaded ✨');