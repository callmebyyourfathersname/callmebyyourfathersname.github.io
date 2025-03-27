// Transactions Functionality
function initTransactions() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) return;
    
    const transactionsList = document.getElementById('transactionsList');
    const filterMonth = document.getElementById('filterMonth');
    const filterYear = document.getElementById('filterYear');
    
    // Load transactions
    function loadTransactions() {
        const month = filterMonth.value;
        const year = filterYear.value;
        
        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        
        // Filter transactions
        if (month !== 'all') {
            transactions = transactions.filter(t => {
                const date = new Date(t.id);
                return date.getMonth() + 1 === parseInt(month) && 
                       date.getFullYear() === parseInt(year);
            });
        } else {
            transactions = transactions.filter(t => {
                const date = new Date(t.id);
                return date.getFullYear() === parseInt(year);
            });
        }
        
        // Display transactions
        if (transactions.length === 0) {
            transactionsList.innerHTML = `
                <div class="no-transactions">
                    <img src="images/empty-transactions.png" alt="No transactions">
                    <p>No transactions yet. Time to prepare for trouble!</p>
                    <a href="index.html" class="btn btn-red">SHOP NOW</a>
                </div>
            `;
            return;
        }
        
        transactionsList.innerHTML = '';
        
        // Sort by date (newest first)
        transactions.sort((a, b) => b.id - a.id);
        
        transactions.forEach(transaction => {
            const transactionElement = document.createElement('div');
            transactionElement.className = 'transaction-item';
            
            const date = new Date(transaction.id);
            const formattedDate = date.toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
            
            const itemsList = transaction.items.map(item => 
                `${item.name} × ${item.quantity} (${item.price})`
            ).join(', ');
            
            transactionElement.innerHTML = `
                <div class="transaction-info">
                    <div class="transaction-date">${formattedDate}</div>
                    <div class="transaction-items">${itemsList}</div>
                </div>
                <div class="transaction-amount">${transaction.total}</div>
            `;
            
            transactionsList.appendChild(transactionElement);
        });
    }
    
    // Filter event listeners
    filterMonth.addEventListener('change', loadTransactions);
    filterYear.addEventListener('change', loadTransactions);
    
    // Initialize
    loadTransactions();
}

// Initialize transactions if on transactions page
if (document.getElementById('transactionsList')) initTransactions();