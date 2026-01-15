// Main JavaScript for LOKTHIEK.com

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVIGATION & THEME =====
    
    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
            showToast('Dark theme activated', 'info');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
            showToast('Light theme activated', 'info');
        }
    });
    
    // ===== HERO SECTION BUTTONS =====
    
    const getStartedBtn = document.getElementById('getStartedBtn');
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const watchVideoBtn = document.getElementById('watchVideoBtn');
    
    getStartedBtn.addEventListener('click', function() {
        showModal('Get Started', 'Welcome! Ready to begin your journey with LOKTHIEK.com?');
    });
    
    learnMoreBtn.addEventListener('click', function() {
        document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
    });
    
    watchVideoBtn.addEventListener('click', function() {
        showModal('Video Player', '<p>Video player would be embedded here.</p><p>This is a demonstration of the modal functionality!</p>');
    });
    
    // ===== TABS FUNCTIONALITY =====
    
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // ===== ACCORDION FUNCTIONALITY =====
    
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
    
    // ===== ACTION BUTTONS =====
    
    // Download Button
    document.getElementById('downloadBtn').addEventListener('click', function() {
        showLoading();
        setTimeout(() => {
            hideLoading();
            showToast('Download started successfully!', 'success');
        }, 2000);
    });
    
    // Upload Button
    document.getElementById('uploadBtn').addEventListener('click', function() {
        showToast('Upload feature activated', 'info');
        // In a real application, this would trigger a file input
    });
    
    // Share Button
    document.getElementById('shareBtn').addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'LOKTHIEK.com',
                text: 'Check out this amazing website!',
                url: window.location.href
            }).then(() => {
                showToast('Shared successfully!', 'success');
            }).catch(() => {
                showToast('Share cancelled', 'warning');
            });
        } else {
            showToast('Share functionality not supported', 'warning');
        }
    });
    
    // Print Button
    document.getElementById('printBtn').addEventListener('click', function() {
        window.print();
        showToast('Print dialog opened', 'info');
    });
    
    // Copy Button
    document.getElementById('copyBtn').addEventListener('click', function() {
        const textToCopy = this.getAttribute('data-copy');
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('Copied to clipboard!', 'success');
        }).catch(() => {
            showToast('Failed to copy', 'error');
        });
    });
    
    // Export Button
    document.getElementById('exportBtn').addEventListener('click', function() {
        showLoading();
        setTimeout(() => {
            hideLoading();
            showToast('Data exported successfully!', 'success');
        }, 1500);
    });
    
    // Like Button
    const likeBtn = document.getElementById('likeBtn');
    let isLiked = false;
    
    likeBtn.addEventListener('click', function() {
        isLiked = !isLiked;
        const icon = this.querySelector('i');
        
        if (isLiked) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            this.style.backgroundColor = '#e74c3c';
            showToast('Added to favorites!', 'success');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            this.style.backgroundColor = '';
            showToast('Removed from favorites', 'info');
        }
    });
    
    // Notify Button
    document.getElementById('notifyBtn').addEventListener('click', function() {
        showToast('You will receive notifications!', 'success');
    });
    
    // ===== CAROUSEL FUNCTIONALITY =====
    
    const carouselTrack = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Create indicators
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    const indicators = document.querySelectorAll('.indicator');
    
    function updateCarousel() {
        const offset = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${offset}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Update slides
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto-advance carousel
    let carouselInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextSlide, 5000);
    });
    
    // ===== FILTER FUNCTIONALITY =====
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            filterItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
            
            showToast(`Filtered by: ${filter}`, 'info');
        });
    });
    
    // Sort functionality
    const sortBtns = document.querySelectorAll('.sort-btn');
    
    sortBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const sortType = this.getAttribute('data-sort');
            showToast(`Sorted by: ${sortType}`, 'info');
        });
    });
    
    // ===== CONTACT FORM =====
    
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        showLoading();
        
        // Simulate form submission
        setTimeout(() => {
            hideLoading();
            showToast('Message sent successfully!', 'success');
            contactForm.reset();
        }, 2000);
    });
    
    // ===== SEARCH FUNCTIONALITY =====
    
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    
    searchBtn.addEventListener('click', function() {
        const query = searchInput.value.trim();
        
        if (query) {
            showLoading();
            setTimeout(() => {
                hideLoading();
                showToast(`Searching for: "${query}"`, 'info');
            }, 1000);
        } else {
            showToast('Please enter a search term', 'warning');
        }
    });
    
    clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        showToast('Search cleared', 'info');
    });
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });
    
    // ===== PAGINATION =====
    
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    let currentPage = 1;
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            
            if (page === 'prev' && currentPage > 1) {
                currentPage--;
            } else if (page === 'next' && currentPage < 5) {
                currentPage++;
            } else if (page !== 'prev' && page !== 'next') {
                currentPage = parseInt(page);
            }
            
            // Update active state
            paginationBtns.forEach(b => {
                if (b.getAttribute('data-page') === currentPage.toString()) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
            
            showToast(`Page ${currentPage} loaded`, 'info');
        });
    });
    
    // ===== SCROLL TO TOP BUTTON =====
    
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== MODAL FUNCTIONALITY =====
    
    const modal = document.getElementById('modal');
    const modalClose = document.getElementById('modalClose');
    const modalConfirm = document.getElementById('modalConfirm');
    const modalCancel = document.getElementById('modalCancel');
    
    function showModal(title, body) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = body;
        modal.classList.add('active');
    }
    
    function hideModal() {
        modal.classList.remove('active');
    }
    
    modalClose.addEventListener('click', hideModal);
    modalCancel.addEventListener('click', hideModal);
    
    modalConfirm.addEventListener('click', function() {
        showToast('Action confirmed!', 'success');
        hideModal();
    });
    
    // Close modal on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideModal();
        }
    });
    
    // ===== TOAST NOTIFICATIONS =====
    
    function showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.classList.add('toast', type);
        
        let icon;
        switch(type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i>';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i>';
                break;
            case 'warning':
                icon = '<i class="fas fa-exclamation-triangle"></i>';
                break;
            case 'info':
            default:
                icon = '<i class="fas fa-info-circle"></i>';
        }
        
        toast.innerHTML = `
            ${icon}
            <span>${message}</span>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Close button functionality
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.remove();
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            toast.remove();
        }, 5000);
    }
    
    // ===== LOADING OVERLAY =====
    
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    function showLoading() {
        loadingOverlay.classList.add('active');
    }
    
    function hideLoading() {
        loadingOverlay.classList.remove('active');
    }
    
    // ===== SMOOTH SCROLLING FOR ALL LINKS =====
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===== NAVBAR SCROLL EFFECT =====
    
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ===== FEATURE CARDS ANIMATION ON SCROLL =====
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // ===== WELCOME MESSAGE =====
    
    setTimeout(() => {
        showToast('Welcome to LOKTHIEK.com! Explore all features.', 'success');
    }, 1000);
    
    // ===== KEYBOARD SHORTCUTS =====
    
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Ctrl/Cmd + / for help
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            showModal('Keyboard Shortcuts', `
                <ul style="list-style: none; padding: 0;">
                    <li style="margin: 10px 0;"><strong>Ctrl/Cmd + K:</strong> Focus search</li>
                    <li style="margin: 10px 0;"><strong>Ctrl/Cmd + /:</strong> Show shortcuts</li>
                    <li style="margin: 10px 0;"><strong>Escape:</strong> Close modal</li>
                    <li style="margin: 10px 0;"><strong>Arrow keys:</strong> Navigate carousel</li>
                </ul>
            `);
        }
    });
    
    // Arrow keys for carousel
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // ===== DETECT MOBILE DEVICE =====
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        console.log('Mobile device detected');
        // Add mobile-specific features here
    }
    
    // ===== PAGE VISIBILITY API =====
    
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page is hidden - can pause animations, stop API calls, etc.
        } else {
            // Page is visible - can resume animations, restart API calls, etc.
        }
    });
    
    // ===== CONSOLE MESSAGE =====
    
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('%cLOKTHIEK.com', 'color: #4a90e2; font-size: 24px; font-weight: bold;');
        console.log('%cComprehensive Web Framework', 'color: #50c878; font-size: 14px;');
        console.log('All features are loaded and ready to use!');
    }
    
    // ===== SET CURRENT YEAR =====
    
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});
