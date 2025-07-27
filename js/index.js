  // Loading screen
  window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 50);
    }, 100);
});

// Mobile menu functionality
const menu = document.querySelector(".menu");
const header = document.querySelector(".main-header");
const mainBody = document.querySelector(".main-body");
const modalOverlay = document.querySelector(".modal-overlay");

menu.addEventListener("click", () => {
    header.classList.toggle("left");
});

mainBody.addEventListener("click", () => {
    if (header.classList.contains("left")) {
        header.classList.remove("left");
    }
});

// Header scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const headerElement = document.querySelector('.main-header');
    const phoneHeader = document.querySelector('.phone-header');
    
    if (window.innerWidth > 800) {
        if (scrollTop > 50) {
            headerElement.classList.add('header-scrolled');
        } else {
            headerElement.classList.remove('header-scrolled');
        }
    } else {
        if (scrollTop > 50) {
            phoneHeader.style.boxShadow = '0 2px 20px rgba(2, 127, 255, 0.1)';
        } else {
            phoneHeader.style.boxShadow = 'none';
        }
    }
    
    lastScrollTop = scrollTop;
});

// Scroll to top button
const toTopBtn = document.querySelector(".up-btn");
window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        toTopBtn.style.display = "flex";
    } else {
        toTopBtn.style.display = "none";
    }
});

toTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll navigation
const links = document.querySelectorAll(".link-btn");
links.forEach((item) => {
    item.addEventListener("click", () => {
        const targetId = item.getAttribute("data-link");
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        if (header.classList.contains("left")) {
            header.classList.remove("left");
        }
    });
});

// Modal functionality
const sorry = document.querySelector(".sorry");
const joinBtns = document.querySelectorAll(".join-now");
const sorryOkayBtn = document.querySelector(".sorry button");
const messageSent = document.querySelector(".message-sent");
const sentOkayBtn = document.querySelector(".message-sent button");

function showModal(modal) {
    modalOverlay.style.display = "block";
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    
    // Animation
    setTimeout(() => {
        modalOverlay.style.opacity = "1";
        modal.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);
}

function hideModal(modal) {
    modalOverlay.style.opacity = "0";
    modal.style.transform = "translate(-50%, -50%) scale(0.9)";
    
    setTimeout(() => {
        modalOverlay.style.display = "none";
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }, 300);
}

// Join now buttons
joinBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        showModal(sorry);
    });
});

sorryOkayBtn.addEventListener("click", () => {
    hideModal(sorry);
});

// Contact form
const textarea = document.querySelector(".send-message textarea");
const sendBtn = document.querySelector(".message-btns .send");
const clearBtn = document.querySelector(".message-btns .clear");

sendBtn.addEventListener("click", () => {
    if (textarea.value.trim() !== "") {
        showModal(messageSent);
        textarea.value = "";
    } else {
        textarea.focus();
        textarea.style.borderColor = "#e74c3c";
        setTimeout(() => {
            textarea.style.borderColor = "#eee";
        }, 2000);
    }
});

clearBtn.addEventListener("click", () => {
    textarea.value = "";
    textarea.focus();
});

sentOkayBtn.addEventListener("click", () => {
    hideModal(messageSent);
});

// Close modal on overlay click
modalOverlay.addEventListener("click", () => {
    hideModal(sorry);
    hideModal(messageSent);
});

// Close modal on escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        hideModal(sorry);
        hideModal(messageSent);
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Add stagger animation to service cards
const serviceCards = document.querySelectorAll('.service');
serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Add hover effects to testimonials
const testimonials = document.querySelectorAll('.comment');
testimonials.forEach(testimonial => {
    testimonial.addEventListener('mouseenter', () => {
        testimonials.forEach(other => {
            if (other !== testimonial) {
                other.style.opacity = '0.7';
                other.style.transform = 'scale(0.98)';
            }
        });
    });

    testimonial.addEventListener('mouseleave', () => {
        testimonials.forEach(other => {
            other.style.opacity = '1';
            other.style.transform = 'scale(1)';
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImg = document.querySelector('.hero-img img');
    if (heroImg && window.innerWidth > 800) {
        heroImg.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add typing effect to hero text
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after page load
setTimeout(() => {
    const heroTitle = document.querySelector('.hero-text .h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 30);
    }
}, 1500);

// Add number animation for statistics
function animateNumber(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateNumber() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = target;
        }
    }
    updateNumber();
}

// Add floating animation to cards
function addFloatingAnimation() {
    const cards = document.querySelectorAll('.service');
    cards.forEach((card, index) => {
        const delay = index * 0.5;
        card.style.animation = `float 6s ease-in-out ${delay}s infinite`;
    });
}

// Initialize floating animation
setTimeout(addFloatingAnimation, 2000);

// Add particle effect (simple version)
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        opacity: 0.6;
        z-index: -1;
    `;
    
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    const duration = 3000 + Math.random() * 2000;
    particle.animate([
        { transform: 'translateY(0px)', opacity: 0.6 },
        { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createParticle, 2000);

// Add smooth reveal animation for sections
function revealSections() {
    const sections = document.querySelectorAll('.fade-in');
    sections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(() => {
    // Scroll-based animations here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add interactive hover effects for buttons
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add smooth scrolling for better UX
const smoothScrollTo = (target, duration = 1000) => {
    const targetElement = document.getElementById(target);
    if (!targetElement) return;

    const startPosition = window.pageYOffset;
    const targetPosition = targetElement.offsetTop - 100;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
};

// Enhanced mobile menu animation
const enhanceMobileMenu = () => {
    const menuIcon = document.querySelector('.menu i');
    menu.addEventListener('click', () => {
        menuIcon.style.transform = header.classList.contains('left') ? 'rotate(0deg)' : 'rotate(90deg)';
    });
};

enhanceMobileMenu();

// Add loading states for better UX
const addLoadingStates = () => {
    const buttons = document.querySelectorAll('.join-now, .send');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('join-now')) return;
            
            const originalText = this.textContent;
            this.textContent = 'Sending...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 1000);
        });
    });
};

addLoadingStates();

// Add entrance animations for better visual appeal
const addEntranceAnimations = () => {
    const cards = document.querySelectorAll('.service');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100 + 1000);
    });
};

// Initialize entrance animations after loading
setTimeout(addEntranceAnimations, 500);
