const canvas = document.getElementById('gameCanvas');

// Get the 2D rendering context
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 600;

const bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    velocity: 0,
    gravity: 0.2
};

// Draw a simple rectangle to test
ctx.fillStyle = 'red';
ctx.fillRect(100, 100, 50, 50); 