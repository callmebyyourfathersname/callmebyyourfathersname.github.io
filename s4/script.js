document.addEventListener('DOMContentLoaded', function() {
    const restaurants = {
        'Omelet': {
            title: 'Omelet',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            address: 'Lorem City, Ipsum Country',
            phone: '123 456 7890',
            hours: 'Open 24 hours',
            price: 'PRICE: ₱200.00',
            
            image: 'img/omelet.jpg'
        },
        'Tonkatsu': {
            title: 'Tonkatsu',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            address: 'Lorem City, Ipsum Country',
            phone: '123 456 7890',
            hours: 'Open 24 hours',
            price: 'PRICE: ₱200.00',
            image: 'img/tonkatsu.jpg'
        },
        'Ramen': {
            title: 'Ramen',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            address: 'Lorem City, Ipsum Country',
            phone: '123 456 7890',
            hours: 'Open 24 hours',
            price: 'PRICE: ₱200.00',
            image: 'img/ramen.jpg'
        },
        'Burger': {
            title: 'Burger',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            address: 'Lorem City, Ipsum Country',
            phone: '123 456 7890',
            hours: 'Open 24 hours',
            price: 'PRICE: ₱200.00',
            image: 'img/burger.png'
        }
    };

    const mainMenu = document.getElementById('mainMenu');
    const detailScreen = document.getElementById('detailScreen');
    const backButton = document.getElementById('backButton');
    const restaurantCards = document.querySelectorAll('.restaurant-card');
    const detailContent = document.getElementById('restaurantDetailContent');

    restaurantCards.forEach(card => {
        card.addEventListener('click', function() {
            const restaurantId = this.getAttribute('data-restaurant');
            showRestaurantDetails(restaurantId);
        });
    });

    backButton.addEventListener('click', function() {
        mainMenu.classList.remove('d-none');
        detailScreen.classList.add('d-none');
    });

    function showRestaurantDetails(restaurantId) {
        const restaurant = restaurants[restaurantId];
        
        detailContent.innerHTML = `
            <img src="${restaurant.image}" alt="${restaurant.title}" class="img-fluid mb-4">
            <h2 class="mb-3">${restaurant.title}</h2>
            <h3 class="mb-4">
             <p class="mb-3">${restaurant.description.split('\n\n')[0]}</p>
                <strong>${restaurant.hours}</strong> | 
                <strong>${restaurant.price}</strong>

            
            <p class="mb-4">
            <hr>
                ${restaurant.address}<br>
                ${restaurant.phone}<br>
            </p>
           
            <p>${restaurant.description.split('\n\n')[1] || ''}</p>
        `;

        mainMenu.classList.add('d-none');
        detailScreen.classList.remove('d-none');
    }
});