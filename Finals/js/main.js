// Shared functionality across all pages
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication status
    checkAuth();
    
    // Highlight current page in navbar
    highlightCurrentPage();
    
    // Initialize page-specific functionality
    if (document.querySelector('.hero-carousel')) initCarousel();
    if (document.getElementById('registrationForm')) initRegistration();
    if (document.getElementById('loginForm')) initLogin();
    if (document.getElementById('logoutBtn')) initLogout();
    if (document.querySelector('.items-grid')) initStore();
    if (document.getElementById('editAvatarBtn')) initProfile();
    if (document.getElementById('transactionsList')) initTransactions();
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// Authentication Functions
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const protectedPages = ['profile.html', 'transactions.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage)) {
        if (!user) {
            window.location.href = 'login.html';
        }
    } else if (currentPage === 'login.html' || currentPage === 'register.html') {
        if (user) {
            window.location.href = 'profile.html';
        }
    }
}

function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Carousel Functionality
function initCarousel() {
    const carousel = document.querySelector('.hero-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Button controls
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Show first slide initially
    showSlide(currentSlide);
}

// Store Data - Add this at the top of main.js
const storeItems = {
    featured: [
        { 
            id: 'ultra-ball-100', 
            name: 'Ultra Ball (100)', 
            price: 800, 
            description: 'The best performance with a high catch rate!', 
            image: 'images/ultra-balls.png',
            badge: 'BEST SELLER'
        },
        { 
            id: 'super-incubator-3', 
            name: 'Super Incubator (3)', 
            price: 1500, 
            description: 'Hatches Eggs 1.5× faster than a standard Incubator', 
            image: 'images/super-incubator.png',
            badge: 'POPULAR'
        },
        { 
            id: 'star-piece-8', 
            name: 'Star Piece (8)', 
            price: 1000, 
            description: 'Increases Stardust earned by 50% for 30 minutes', 
            image: 'images/star-piece.png'
        },
        { 
            id: 'premium-raid-pass-3', 
            name: 'Premium Raid Pass (3)', 
            price: 250, 
            description: 'Join a Raid Battle at a Gym', 
            image: 'images/raid-pass.png'
        }
    ],
    boxes: [
        { 
            id: 'adventure-box', 
            name: 'Adventure Box', 
            price: 1480, 
            description: 'Contains: 3 Super Incubators, 3 Incubators, 3 Lucky Eggs, 3 Star Pieces', 
            image: 'images/adventure-box.png',
            badge: 'LIMITED'
        },
        { 
            id: 'ultra-box', 
            name: 'Ultra Box', 
            price: 2500, 
            description: 'Contains: 10 Premium Raid Passes, 10 Super Incubators, 4 Incense, 4 Star Pieces', 
            image: 'images/ultra-box.png',
            badge: 'BEST VALUE'
        },
        { 
            id: 'special-box', 
            name: 'Special Box', 
            price: 480, 
            description: 'Contains: 2 Premium Raid Passes, 2 Incense, 2 Star Pieces', 
            image: 'images/special-box.png'
        },
        { 
            id: 'community-box', 
            name: 'Community Day Box', 
            price: 1280, 
            description: 'Contains: 1 Elite Fast TM, 1 Elite Charged TM, 30 Ultra Balls, 3 Star Pieces', 
            image: 'images/community-box.png'
        }
    ],
    coins: [
        { 
            id: '100-coins', 
            name: '100 PokéCoins', 
            price: 0.99, 
            description: 'In-game currency for purchasing items', 
            image: 'images/pokecoins-100.png',
            isRealMoney: true
        },
        { 
            id: '550-coins', 
            name: '550 PokéCoins', 
            price: 4.99, 
            description: 'In-game currency for purchasing items', 
            image: 'images/pokecoins-550.png',
            isRealMoney: true,
            badge: 'BEST VALUE'
        },
        { 
            id: '1200-coins', 
            name: '1,200 PokéCoins', 
            price: 9.99, 
            description: 'In-game currency for purchasing items', 
            image: 'images/pokecoins-1200.png',
            isRealMoney: true
        },
        { 
            id: '2500-coins', 
            name: '2,500 PokéCoins', 
            price: 19.99, 
            description: 'In-game currency for purchasing items', 
            image: 'images/pokecoins-2500.png',
            isRealMoney: true
        }
    ],
    bundles: [
        { 
            id: 'daily-free', 
            name: 'Daily Free Bundle', 
            price: 0, 
            description: 'Contains: 10 Poké Balls', 
            image: 'images/daily-bundle.png',
            badge: 'FREE'
        },
        { 
            id: 'special-bundle', 
            name: 'Special Bundle', 
            price: 1, 
            description: 'Contains: 1 Remote Raid Pass, 10 Great Balls', 
            image: 'images/special-bundle.png',
            badge: 'LIMITED'
        },
        { 
            id: 'premium-bundle', 
            name: 'Premium Bundle', 
            price: 250, 
            description: 'Contains: 3 Premium Raid Passes, 3 Incense', 
            image: 'images/premium-bundle.png'
        },
        { 
            id: 'stardust-bundle', 
            name: 'Stardust Bundle', 
            price: 300, 
            description: 'Contains: 5 Star Pieces, 20 Ultra Balls', 
            image: 'images/stardust-bundle.png'
        }
    ]
};

// Initialize Store - Add this to the init functions
function initStore() {
    // Load all store items
    loadStoreItems('featured', 'featuredItems');
    loadStoreItems('boxes', 'itemBoxes');
    loadStoreItems('coins', 'pokeCoins');
    loadStoreItems('bundles', 'dailyBundles');
    
    // Initialize cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart(cart);
    
    // Tab functionality
    const tabs = document.querySelectorAll('.store-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and sections
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.store-section').forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding section
            tab.classList.add('active');
            const target = tab.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // Cart toggle
    document.getElementById('cartToggle').addEventListener('click', showCart);
    document.querySelector('.close-cart').addEventListener('click', hideCart);
    
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', checkout);
}

function loadStoreItems(category, elementId) {
    const container = document.getElementById(elementId);
    if (!container) return;
    
    container.innerHTML = '';
    
    storeItems[category].forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        
        let badge = '';
        if (item.badge) {
            badge = `<div class="item-badge">${item.badge}</div>`;
        }
        
        itemCard.innerHTML = `
            ${badge}
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">${item.isRealMoney ? '$' + item.price.toFixed(2) : item.price + ' PokéCoins'}</div>
                <div class="item-description">${item.description}</div>
                <button class="add-to-cart" data-id="${item.id}" data-category="${category}">Add to Cart</button>
            </div>
        `;
        
        container.appendChild(itemCard);
    });
    
    // Add event listeners to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add initStore to the DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    if (document.querySelector('.store-container')) initStore();
});