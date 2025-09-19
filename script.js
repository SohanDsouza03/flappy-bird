const canvas = document.getElementById('gameCanvas');

// Get the 2D rendering context
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 600;

const bird = {
    x: 50,
    y: 150,
    width: 20,                        //<-- bird variable
    height: 20,
    velocity: 0,
    gravity: 0.2
}; 

function draw() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);  //<-- clear canvas in each frame

    
    ctx.fillStyle = 'red';                                   
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);      //<-- draw bird square
}

function update() {
    
    bird.velocity += bird.gravity;

    bird.y += bird.velocity;

    if (bird.y + bird.height > canvas.height) {
        bird.y = canvas.height - bird.height;
        bird.velocity = 0;
    }

    if (bird.y < 0) {
        bird.y = 0;
        bird.velocity = 0;
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function jump() {
    bird.velocity = -4; // <-- Negative velocity makes it move up
}


document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();                                 // basically listen to spacebar command
    }
});

gameLoop();

// Draw a simple rectangle to test
ctx.fillStyle = 'red';
ctx.fillRect(100, 100, 50, 50); 