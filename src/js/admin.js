// admin.js - Updated with null checks

const teamMembers = [
    // ... (keep your existing team member data) ...
];

document.addEventListener('DOMContentLoaded', () => {
    // Safely get elements
    const adminBtn = document.querySelector('.admin-btn');
    const adminModal = document.getElementById('adminModal');
    const closeModal = document.querySelector('.close-modal');

    // Only setup if elements exist
    if (adminBtn && adminModal && closeModal) {
        adminBtn.addEventListener('click', (e) => {
            e.preventDefault();
            adminModal.style.display = 'block';
            renderTeamGrid();
            animateStats();
        });

        closeModal.addEventListener('click', () => {
            adminModal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === adminModal) {
                adminModal.style.display = 'none';
            }
        });
    } else {
        console.error('Admin elements not found - check your HTML');
    }

    function renderTeamGrid() {
        const grid = document.querySelector('.team-grid');
        if (!grid) return;
        
        grid.innerHTML = teamMembers.map(member => `
            <div class="team-card">
                <img src="${member.image}" alt="${member.name}" class="team-img">
                <div class="team-info">
                    <h3>${member.name}</h3>
                    <p>${member.position}</p>
                </div>
            </div>
        `).join('');
    }

    function animateStats() {
        const statsElements = {
            orders: document.getElementById('total-orders'),
            users: document.getElementById('active-users'),
            revenue: document.getElementById('revenue')
        };

        // Only animate if elements exist
        if (Object.values(statsElements).every(el => el)) {
            const duration = 2000;
            const start = Date.now();
            const targets = { orders: 1248, users: 3572, revenue: 248920 };
            const stats = { orders: 0, users: 0, revenue: 0 };

            function update() {
                const progress = Math.min((Date.now() - start) / duration, 1);
                
                stats.orders = Math.floor(progress * targets.orders);
                stats.users = Math.floor(progress * targets.users);
                stats.revenue = Math.floor(progress * targets.revenue);
                
                statsElements.orders.textContent = stats.orders.toLocaleString();
                statsElements.users.textContent = stats.users.toLocaleString();
                statsElements.revenue.textContent = `R${stats.revenue.toLocaleString()}`;
                
                if (progress < 1) requestAnimationFrame(update);
            }
            
            update();
        }
    }
});
