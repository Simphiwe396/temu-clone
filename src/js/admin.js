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
    name: "Slindile Kubheka",
    position: "Assistant Manager",
    image: "/images/team/slindile.jpg",
    bio: "Marketing and communications expert."
  }
];

// Initialize Admin Panel
document.addEventListener('DOMContentLoaded', () => {
  const adminBtn = document.querySelector('.admin-access-btn');
  const adminPanel = document.querySelector('.admin-panel');
  
  adminBtn.addEventListener('click', () => {
    adminPanel.classList.add('active');
    renderTeamGrid();
    animateStats();
  });

  document.querySelector('.close-admin').addEventListener('click', () => {
    adminPanel.classList.remove('active');
  });

  function renderTeamGrid() {
    const grid = document.querySelector('.team-grid');
    grid.innerHTML = '';
    
    teamMembers.forEach(member => {
      const card = document.createElement('div');
      card.className = 'team-card';
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name}" class="team-img">
        <div class="team-info">
          <h3>${member.name}</h3>
          <p>${member.position}</p>
        </div>
      `;
      card.addEventListener('click', () => showMemberModal(member));
      grid.appendChild(card);
    });
  }

  function showMemberModal(member) {
    const modal = document.querySelector('.team-modal');
    const content = document.querySelector('.member-details');
    
    content.innerHTML = `
      <img src="${member.image}" alt="${member.name}" class="member-img">
      <h2>${member.name}</h2>
      <h3>${member.position}</h3>
      <p class="member-bio">${member.bio}</p>
    `;
    
    modal.style.display = 'flex';
    document.querySelector('.close-modal').addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  function animateStats() {
    const stats = {
      orders: 0,
      users: 0,
      revenue: 0
    };
    
    const targets = {
      orders: 1248,
      users: 3572,
      revenue: 248920
    };
    
    const duration = 2000;
    const start = Date.now();
    
    function update() {
      const progress = Math.min((Date.now() - start) / duration, 1);
      
      stats.orders = Math.floor(progress * targets.orders);
      stats.users = Math.floor(progress * targets.users);
      stats.revenue = Math.floor(progress * targets.revenue);
      
      document.getElementById('total-orders').textContent = stats.orders.toLocaleString();
      document.getElementById('active-users').textContent = stats.users.toLocaleString();
      document.getElementById('revenue').textContent = `R${stats.revenue.toLocaleString()}`;
      
      if (progress < 1) requestAnimationFrame(update);
    }
    
    update();
  }
});