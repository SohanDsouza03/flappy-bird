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

    bird.y += bird.velocity;                                         //<-- move bird in y axis 

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






const pipes = [];
const pipeWidth = 45;
const pipeGap = 120;                                //<-- pipes variable
const pipeSpeed = 2; 
let frame = 0; 


function createPipe() {
    const minHeight =   50;
    const maxHeight = canvas.height - pipeGap - minHeight;
    const topPipeHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    const bottomPipeHeight = canvas.height - topPipeHeight - pipeGap;

    pipes.push({
        x: canvas.width,
        topHeight: topPipeHeight,
        bottomHeight: bottomPipeHeight,
        passed: false                     // <-- To track if the bird has passed this pipe for scoring
    });
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';                              //<-- updated bird 
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    
    ctx.fillStyle = 'green';                            //<-- draw pipe color green 
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottomHeight, pipeWidth, pipe.bottomHeight);
    });
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

    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed;
    });


    if (frame % 200 === 0) { //<-- Creates a new pipe every 200 frames
        createPipe();
    }
    frame++;
    if (pipes.length > 0 && pipes[0].x < -pipeWidth) {     //<-- Remove pipes that have gone off-screen

        pipes.shift();
    }
}


gameLoop();


// ctx.fillStyle = 'red';
// ctx.fillRect(100, 100, 50, 50);              //<-- draw a simple rectangle for a test

