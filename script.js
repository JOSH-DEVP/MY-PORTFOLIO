// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    // Add mobile menu button
    const nav = document.querySelector('nav');
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'md:hidden text-gray-600 dark:text-gray-300';
    mobileMenuButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
    `;
    nav.querySelector('.flex').appendChild(mobileMenuButton);

    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg';
    mobileMenu.innerHTML = `
        <div class="flex flex-col p-4 space-y-4">
            <a href="#home" class="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300">Home</a>
            <a href="#about" class="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300">About</a>
            <a href="#skills" class="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300">Skills</a>
            <a href="#projects" class="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300">Projects</a>
            <a href="#contact" class="text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-300">Contact</a>
        </div>
    `;
    nav.appendChild(mobileMenu);

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Form submission handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Add loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    }

    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
        });
    }

    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }

    // Add typing animation to hero section
    const heroTitle = document.querySelector('#home h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        typeWriter();
    }

    // Add parallax effect to hero section
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }

    // Add progress bars animation
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const progress = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = progress;
        }, 500);
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('transform', 'scale-105');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('transform', 'scale-105');
        });
    });

    // Add scroll progress indicator
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'fixed top-0 left-0 h-1 bg-blue-500 z-50';
    document.body.appendChild(progressIndicator);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressIndicator.style.width = scrolled + '%';
    });
});

// Modal functionality
function openModal(content) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    
    // Clear previous content
    modalContent.innerHTML = '';
    
    // Create an img element
    const img = document.createElement('img');
    img.src = content;
    img.className = 'w-full h-auto max-h-[90vh] object-contain';
    modalContent.appendChild(img);
    
    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close modal when clicking outside
document.getElementById('projectModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
