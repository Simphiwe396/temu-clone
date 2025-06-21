// Countdown Timer
function updateCountdown() {
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 12);
    
    const timer = setInterval(() => {
        const now = new Date();
        const diff = endTime - now;
        
        if (diff <= 0) {
            clearInterval(timer);
            return;
        }
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Spin the Wheel
document.getElementById('spin-btn').addEventListener('click', () => {
    const wheel = document.getElementById('wheel');
    const btn = document.getElementById('spin-btn');
    
    btn.disabled = true;
    const randomDegree = Math.floor(1440 + (Math.random() * 360));
    wheel.style.transform = `rotate(${randomDegree}deg)`;
    
    setTimeout(() => {
        btn.disabled = false;
        const actualDegree = randomDegree % 360;
        let prize;
        
        if (actualDegree < 60) prize = "$5 OFF";
        else if (actualDegree < 120) prize = "10% OFF";
        else if (actualDegree < 180) prize = "$3 OFF";
        else if (actualDegree < 240) prize = "FREE SHIP";
        else if (actualDegree < 300) prize = "$1 OFF";
        else prize = "20% OFF";
        
        alert(`Congratulations! You won: ${prize}`);
    }, 5000);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    
    // Simulate price drop notifications
    setInterval(() => {
        const users = ['User_482', 'User_156', 'User_893', 'User_327'];
        const products = ['Wireless Earbuds', 'Smart Watch', 'Phone Case', 'Bluetooth Speaker'];
        const newPrice = (Math.random() * 10).toFixed(2);
        const oldPrice = (parseFloat(newPrice) + Math.random() * 20).toFixed(2);
        
        const notification = document.querySelector('.notification');
        notification.innerHTML = `
            <span class="user">${users[Math.floor(Math.random() * users.length)]}</span> 
            just bought <span class="product">${products[Math.floor(Math.random() * products.length)]}</span> 
            for <span class="new-price">$${newPrice}</span> 
            (was <span class="old-price">$${oldPrice}</span>)
            <span class="time">Just now</span>
        `;
    }, 15000);
});