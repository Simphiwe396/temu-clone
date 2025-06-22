// admin.js - Complete Admin Panel Functionality

// Team Data
const teamMembers = [
    {
        id: 1,
        name: "Simphiwe Kubheka",
        position: "Founder and Director",
        image: "/images/team/Simphiwe.jpg",
        bio: "Visionary leader with 15+ years of experience in e-commerce and business strategy."
    },
    {
        id: 2,
        name: "Nqobile Kubheka",
        position: "Director",
        image: "/images/team/nqobile.jpg",
        bio: "Operations expert specializing in logistics and customer experience."
    },
    {
        id: 3,
        name: "Themba Kubheka",
        position: "Director",
        image: "/images/team/themba.jpg",
        bio: "Technology innovator responsible for platform development."
    },
    {
        id: 4,
        name: "Dudu Kubheka",
        position: "CEO",
        image: "/images/team/dudu.jpg",
        bio: "Seasoned executive with a track record of scaling businesses."
    },
    {
        id: 5,
        name: "Lindiwe Tshabalala",
        position: "Manager",
        image: "/images/team/lindiwe.jpg",
        bio: "Customer service specialist managing our support team."
    },
    {
        id: 6,
        name: "Silindile Kubheka",
        position: "Assistant Manager",
        image: "/images/team/silindile.jpg",
        bio: "Marketing and communications expert."
    }
];

// Initialize Admin Panel
document.addEventListener('DOMContentLoaded', () => {
    // Get all admin triggers
    const adminTriggers = [
        document.querySelector('.admin-btn'), // Nav button
        document.querySelector('.admin-access-btn') // Floating button
    ];
    
    const adminModal = document.getElementById('adminModal');
    const closeModal = document.querySelector('.close-modal');

    // Add click handlers to all triggers
    adminTriggers.forEach(trigger => {
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                adminModal.style.display = 'block';
                renderTeamGrid();
                animateStats();
            });
        }
    });

    // Close modal when X is clicked
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            adminModal.style.display = 'none';
        });
    }

    // Close when clicking outside modal
    window.addEventListener('click', (e) => {
        if (e.target === adminModal) {
            adminModal.style.display = 'none';
        }
    });

    // Render team grid
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

    // Animate statistics
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
