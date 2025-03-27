// Profile Functionality
function initProfile() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;
    
    // Display user info
    document.getElementById('username').textContent = user.ign.toUpperCase();
    document.getElementById('profilePlayerId').textContent = `ID: ${user.playerId}`;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileBirthday').textContent = new Date(user.birthday).toLocaleDateString('en-US', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    }) || 'Not specified';
    document.getElementById('profileGender').textContent = user.gender.charAt(0).toUpperCase() + user.gender.slice(1);
    document.getElementById('joinDate').textContent = user.joinDate;
    
    // Display stats
    document.getElementById('pokemonCaught').textContent = user.stats.pokemonCaught;
    document.getElementById('gymsDefended').textContent = user.stats.gymsDefended;
    document.getElementById('itemsPurchased').textContent = user.stats.itemsPurchased;
    document.getElementById('totalSpent').textContent = user.stats.totalSpent + ' PokéCoins';
    
    // Avatar upload
    document.getElementById('editAvatarBtn').addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    document.getElementById('userAvatar').src = e.target.result;
                    // Save to localStorage
                    user.avatar = e.target.result;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    
                    // Update users list
                    let users = JSON.parse(localStorage.getItem('users')) || [];
                    const userIndex = users.findIndex(u => u.ign === user.ign);
                    if (userIndex !== -1) {
                        users[userIndex] = user;
                        localStorage.setItem('users', JSON.stringify(users));
                    }
                }
                
                reader.readAsDataURL(this.files[0]);
            }
        });
        
        input.click();
    });
    
    // Load avatar if exists
    if (user.avatar) {
        document.getElementById('userAvatar').src = user.avatar;
    }
}
// Initialize profile if on profile page
if (document.getElementById('profilePlayerId')) initProfile();