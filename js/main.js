// ===== MOBILE MENU TOGGLE =====
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navItems = document.querySelectorAll('.nav-item');

// Toggle mobile menu
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking nav items
navItems.forEach(item => {
    item.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== HEADER SCROLL EFFECT =====
const header = document.querySelector('.header-pill');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== OPENING VIDEO =====
const openingVideoContainer = document.getElementById('openingVideo');
const openingVideoElement = document.getElementById('openingVideoElement');

if (openingVideoElement) {
    openingVideoElement.addEventListener('ended', () => {
        openingVideoContainer.classList.add('hidden');
        setTimeout(() => {
            openingVideoContainer.style.display = 'none';
        }, 500);
    });
    
    // Skip intro on click
    openingVideoContainer.addEventListener('click', () => {
        openingVideoContainer.classList.add('hidden');
        setTimeout(() => {
            openingVideoContainer.style.display = 'none';
        }, 500);
    });
}

// ===== SMOOTH SCROLL =====
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

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe sections (exclude about section to prevent text glitches)
document.querySelectorAll('section').forEach(section => {
    if (section.id !== 'about') {
        observer.observe(section);
    }
});

// ===== ACTIVE NAV LINK =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-item').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== VIEW MORE BUTTON TOGGLE =====
const viewMoreBtn = document.getElementById('viewMoreBtn');
const moreContent = document.getElementById('moreContent');

if (viewMoreBtn && moreContent) {
    moreContent.addEventListener('shown.bs.collapse', () => {
        viewMoreBtn.textContent = 'View Less';
    });
    
    moreContent.addEventListener('hidden.bs.collapse', () => {
        viewMoreBtn.textContent = 'View More';
    });
}

// ===== NEWSLETTER FORM =====
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Show success message
        const button = newsletterForm.querySelector('button');
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.background = '#28a745';
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
            emailInput.value = '';
        }, 2000);
        
        // Here you can add actual newsletter subscription logic
        console.log('Newsletter subscription:', email);
    });
}

// ===== ABOUT SECTION TABS =====
const aboutTabs = document.querySelectorAll('.about-tab');
const tabContents = document.querySelectorAll('.tab-content-box');

aboutTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        
        // Remove active class from all tabs
        aboutTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Show target tab content
        const targetContent = document.getElementById(`tab-${targetTab}`);
        if (targetContent) {
            // Small delay for smooth transition
            setTimeout(() => {
                targetContent.classList.add('active');
            }, 100);
        }
    });
});

// ===== EXPANDABLE SPEAKER CARDS =====
const speakerCards = document.querySelectorAll('.speaker-card');

speakerCards.forEach(card => {
    const expandBtn = card.querySelector('.speaker-expand-btn');
    
    if (expandBtn) {
        // Expand/collapse on button click
        expandBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCard(card);
        });
        
        // Also allow clicking the entire card to expand (except on mobile to avoid issues)
        if (window.innerWidth > 768) {
            card.addEventListener('click', (e) => {
                // Don't expand if clicking links or buttons
                if (!e.target.closest('a, button')) {
                    toggleCard(card);
                }
            });
        }
    }
});

function toggleCard(card) {
    const isExpanded = card.classList.contains('expanded');
    
    // Close all other cards
    speakerCards.forEach(c => {
        if (c !== card && c.classList.contains('expanded')) {
            c.classList.remove('expanded');
            const btn = c.querySelector('.speaker-expand-btn');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Toggle current card
    if (isExpanded) {
        card.classList.remove('expanded');
        expandBtn.setAttribute('aria-expanded', 'false');
    } else {
        card.classList.add('expanded');
        expandBtn.setAttribute('aria-expanded', 'true');
        
        // Scroll card into view smoothly
        setTimeout(() => {
            card.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 100);
    }
}
