// Registration Functionality
function initRegistration() {
    const registrationForm = document.getElementById('registrationForm');
    const playerIdDisplay = document.getElementById('playerIdDisplay');
    
    // Generate random player ID
    function generatePlayerId() {
        let id = '';
        for (let i = 0; i < 3; i++) {
            id += Math.floor(1000 + Math.random() * 9000);
            if (i < 2) id += ' ';
        }
        return id;
    }
    
    // Display generated player ID
    const playerId = generatePlayerId();
    playerIdDisplay.textContent = `Your Team Rocket ID: ${playerId}`;
    
    // Form submission
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        
        // Create user object
        const user = {
            email: document.getElementById('email').value,
            password: password,
            ign: document.getElementById('ign').value,
            playerId: playerId,
            birthday: document.getElementById('birthday').value,
            gender: document.querySelector('input[name="gender"]:checked')?.value || 'not specified',
            joinDate: new Date().toLocaleDateString(),
            stats: {
                pokemonCaught: 0,
                gymsDefended: 0,
                itemsPurchased: 0,
                totalSpent: 0
            }
        };
        
        // Save user to localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Save to users list
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Redirect to profile
        window.location.href = 'profile.html';
    });
}

// Login Functionality
function initLogin() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const ign = document.getElementById('loginIgn').value;
        const password = document.getElementById('loginPassword').value;
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Find matching user
        const user = users.find(u => u.ign === ign && u.password === password);
        
        if (user) {
            // Set as current user
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Redirect to profile
            window.location.href = 'profile.html';
        } else {
            alert('Invalid IGN or password!');
        }
    });
}

// Logout Functionality
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
}

// Initialize auth modules
if (document.getElementById('registrationForm')) initRegistration();
if (document.getElementById('loginForm')) initLogin();
if (document.getElementById('logoutBtn')) initLogout();