// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeIcon();
    }

    // Show scroll-to-top button when scrolling
    window.addEventListener('scroll', handleScroll);
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        const dropdown = document.querySelector('.dropdown');
        if (dropdown && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}

// Scroll handling
function handleScroll() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Theme Toggle
function updateThemeIcon() {
    const themeIcon = document.querySelector('.theme-icon');
    if (document.body.classList.contains('dark-theme')) {
        themeIcon.textContent = '☀️';
    } else {
        themeIcon.textContent = '🌙';
    }
}

document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
});

// Hamburger Menu
document.getElementById('hamburger').addEventListener('click', function() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('active');
    this.classList.toggle('active');
});

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Toast Notifications
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? '✓' : type === 'warning' ? '⚠' : '✕';
    
    toast.innerHTML = `
        <span>${icon}</span>
        <span>${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Copy to Clipboard
function copyToClipboard() {
    const copyText = document.getElementById('copyText');
    copyText.select();
    
    try {
        document.execCommand('copy');
        showToast('Text copied to clipboard!', 'success');
    } catch (err) {
        // Fallback for modern browsers
        navigator.clipboard.writeText(copyText.value).then(() => {
            showToast('Text copied to clipboard!', 'success');
        }).catch(() => {
            showToast('Failed to copy text', 'error');
        });
    }
}

// Search Functionality
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const query = searchInput.value.trim();
    
    if (query) {
        searchResults.textContent = `Searching for: "${query}"...`;
        
        // Simulate search delay
        setTimeout(() => {
            searchResults.textContent = `Found 3 results for "${query}"`;
            showToast('Search completed', 'success');
        }, 500);
    } else {
        searchResults.textContent = 'Please enter a search term';
    }
}

// Tab Functions
let currentTab = 0;

function switchTab(index) {
    const tabs = document.querySelectorAll('.tab-button');
    const panes = document.querySelectorAll('.tab-pane');
    
    tabs.forEach((tab, i) => {
        if (i === index) {
            tab.classList.add('active');
            panes[i].classList.add('active');
        } else {
            tab.classList.remove('active');
            panes[i].classList.remove('active');
        }
    });
    
    currentTab = index;
}

// Accordion Functions
function toggleAccordion(button) {
    const item = button.parentElement;
    const wasActive = item.classList.contains('active');
    
    // Close all accordions
    document.querySelectorAll('.accordion-item').forEach(acc => {
        acc.classList.remove('active');
    });
    
    // Open clicked accordion if it wasn't active
    if (!wasActive) {
        item.classList.add('active');
    }
}

// Carousel Functions
let currentSlide = 0;

function moveCarousel(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide += direction;
    
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function currentSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Auto-play carousel
setInterval(() => {
    moveCarousel(1);
}, 5000);

// Dropdown Functions
function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('active');
}

function handleDropdownAction(action) {
    showToast(`${action} action selected`, 'success');
    toggleDropdown();
}

// Media Control Functions
let isPlaying = false;

function togglePlayPause() {
    const btn = document.getElementById('playPauseBtn');
    const icon = document.getElementById('playPauseIcon');
    
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        icon.textContent = '⏸️';
        btn.innerHTML = `<span id="playPauseIcon">⏸️</span> Pause`;
        showToast('Playing...', 'success');
    } else {
        icon.textContent = '▶️';
        btn.innerHTML = `<span id="playPauseIcon">▶️</span> Play`;
        showToast('Paused', 'success');
    }
}

function stopMedia() {
    isPlaying = false;
    const btn = document.getElementById('playPauseBtn');
    const icon = document.getElementById('playPauseIcon');
    icon.textContent = '▶️';
    btn.innerHTML = `<span id="playPauseIcon">▶️</span> Play`;
    showToast('Stopped', 'success');
}

function previousTrack() {
    showToast('Previous track', 'success');
}

function nextTrack() {
    showToast('Next track', 'success');
}

// Filter & Sort Functions
let currentFilter = 'all';

function filterItems(category) {
    currentFilter = category;
    const items = document.querySelectorAll('.item');
    const filterBtns = document.querySelectorAll('.btn-filter');
    
    // Update active button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter items
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });
    
    showToast(`Filtered by: ${category}`, 'success');
}

function sortItems(sortBy) {
    showToast(`Sorted by: ${sortBy}`, 'success');
    const itemsList = document.getElementById('itemsList');
    const items = Array.from(itemsList.querySelectorAll('.item'));
    
    items.sort((a, b) => {
        if (sortBy === 'name') {
            return a.textContent.localeCompare(b.textContent);
        } else if (sortBy === 'date') {
            // Simulate date sorting
            return Math.random() - 0.5;
        }
        return 0;
    });
    
    itemsList.innerHTML = '';
    items.forEach(item => itemsList.appendChild(item));
}

// Pagination Functions
let currentPage = 1;

function changePage(direction) {
    const pages = document.querySelectorAll('.page-btn');
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= pages.length) {
        goToPage(newPage);
    }
}

function goToPage(pageNum) {
    currentPage = pageNum;
    const pages = document.querySelectorAll('.page-btn');
    
    pages.forEach((page, i) => {
        if (i + 1 === pageNum) {
            page.classList.add('active');
        } else {
            page.classList.remove('active');
        }
    });
    
    showToast(`Page ${pageNum}`, 'success');
}

// Social & Action Functions
let likeCount = 0;
let isLiked = false;

function likeAction() {
    isLiked = !isLiked;
    const likeIcon = document.getElementById('likeIcon');
    const likeCountEl = document.getElementById('likeCount');
    
    if (isLiked) {
        likeCount++;
        likeIcon.textContent = '❤️';
        showToast('Liked!', 'success');
    } else {
        likeCount--;
        likeIcon.textContent = '🤍';
        showToast('Unliked', 'success');
    }
    
    likeCountEl.textContent = `(${likeCount})`;
}

function shareAction() {
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
        // Fallback
        showToast('Share: ' + window.location.href, 'success');
    }
}

function printPage() {
    window.print();
    showToast('Print dialog opened', 'success');
}

function exportData() {
    const data = 'Sample Data\nColumn1,Column2\nValue1,Value2';
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'export.csv';
    a.click();
    showToast('Data exported!', 'success');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.json,.txt';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            showToast(`Importing: ${file.name}`, 'success');
        }
    };
    input.click();
}

// Expand/Collapse Functions
let isExpanded = false;

function toggleExpand() {
    isExpanded = !isExpanded;
    const fullText = document.getElementById('fullText');
    const expandBtn = document.getElementById('expandBtn');
    
    if (isExpanded) {
        fullText.classList.remove('hidden');
        expandBtn.textContent = 'Show Less';
    } else {
        fullText.classList.add('hidden');
        expandBtn.textContent = 'Show More';
    }
}

// Loading State Functions
function simulateLoading(button) {
    button.classList.add('loading');
    const spinner = button.querySelector('.spinner');
    spinner.classList.remove('hidden');
    
    setTimeout(() => {
        button.classList.remove('loading');
        spinner.classList.add('hidden');
        showToast('Loading complete!', 'success');
    }, 2000);
}

// File Operations
function downloadFile() {
    const content = 'This is a sample file downloaded from LOKTHIEK.com';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample.txt';
    a.click();
    showToast('File downloaded!', 'success');
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        showToast(`Uploaded: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`, 'success');
    }
}

// Contact Form
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simulate form submission
    showToast('Submitting form...', 'success');
    
    setTimeout(() => {
        showToast(`Thank you, ${name}! Your message has been sent.`, 'success');
        form.reset();
    }, 1000);
}

// Social Links
function openSocial(platform) {
    const urls = {
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com'
    };
    
    if (urls[platform]) {
        showToast(`Opening ${platform}...`, 'success');
        // In a real app, would open: window.open(urls[platform], '_blank');
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});
