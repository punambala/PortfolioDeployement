// Get canvas and context
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

// Resize the canvas to fit the entire window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Mouse position and radius
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 80) * (canvas.width / 80)
};

// Event listener for mouse movement
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Particle class to create individual particles
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // Method to draw the particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Method to update particle's position and behavior
    update() {
        // Check if particle is out of bounds and reverse its direction
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Collision with mouse to attract particles
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x) this.x -= 10;
            if (mouse.x > this.x) this.x += 10;
            if (mouse.y < this.y) this.y -= 10;
            if (mouse.y > this.y) this.y += 10;
        }

        // Move the particle
        this.x += this.directionX;
        this.y += this.directionY;

        // Draw the particle
        this.draw();
    }
}

// Create particles array
let particlesArray = [];

// Initialize particles
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#8C5523';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Draw connecting lines between particles
function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) { // Adjust distance for connection threshold
                ctx.strokeStyle = 'rgba(140, 85, 31, 1)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate); // Keep the animation running
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas on each frame

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(); // Update particle positions
    }

    connect(); // Draw lines between particles
}

// Resize event listener to adjust canvas size
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.radius = (canvas.height / 80) * (canvas.width / 80);
    init(); // Reinitialize particles on window resize
});

// Initialize and animate
init();
animate();

// Get the logo elements
const logoName = document.getElementById('logo-name');
const logoPortfolio = document.getElementById('logo-portfolio');

// Toggle visibility of the logo parts on click
logoName.addEventListener('click', function () {
    // Show "Portfolio" and hide "Yash"
    logoName.style.display = 'none';
    logoPortfolio.style.display = 'inline-block';
});

logoPortfolio.addEventListener('click', function () {
    // Show "Yash" and hide "Portfolio"
    logoPortfolio.style.display = 'none';
    logoName.style.display = 'inline-block';
});

// Get the theme toggle button and the theme icon
const themeButton = document.getElementById('theme-button');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Check if the theme is already stored in localStorage
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeIcon.classList.replace('bx-moon', 'bx-sun'); // Set the icon to sun for dark mode
} else {
    body.classList.add('light-theme');
    themeIcon.classList.replace('bx-sun', 'bx-moon'); // Set the icon to moon for light mode
}

// Toggle the theme when the button is clicked
themeButton.addEventListener('click', function () {
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');

    // Change the icon and save the theme preference
    if (body.classList.contains('dark-theme')) {
        themeIcon.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('theme', 'dark'); // Store dark theme in localStorage
    } else {
        themeIcon.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('theme', 'light'); // Store light theme in localStorage
    }
});
document.addEventListener('DOMContentLoaded', function () {
    var options = {
        strings: ["Web Developer", "Designer", "Freelancer", "Coder"],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 2000,
        startDelay: 500,
        loop: true
    };

    var typed = new Typed(".animated-text", options);
});
// Toggle the menu when the hamburger icon is clicked
const menuButton = document.getElementById('menu-btn');
const menuBar = document.querySelector('.menu-bar');

menuButton.addEventListener('click', () => {
    menuBar.classList.toggle('active'); // Toggle the menu visibility
});