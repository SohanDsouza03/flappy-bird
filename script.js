const canvas = document.getElementById('gameCanvas');

// Get the 2D rendering context
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 600;

// --- Game State Variables ---
let score = 0;
let isGameOver = false;

const bird = {
    x: 50,
    y: 150,
    width: 20,                        //<-- bird variable
    height: 20,
    velocity: 0,
    gravity: 0.2             
}; 

const pipes = [];
const pipeWidth = 45;
const pipeGap = 120;                  //<-- pipes variable
const pipeSpeed = 2; 
let frame = 0; 


function createPipe() {
    const minHeight =   50;                     //<-- pipe creation function
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
    ctx.fillStyle = 'white';                              //<-- drawing bird 
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    
    ctx.fillStyle = 'green';                            //<-- draw pipe color green 
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottomHeight, pipeWidth, pipe.bottomHeight);
    });
     
    // Draw the score on the canvas
    ctx.fillStyle = 'black';
    ctx.font = '22px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function update() {

     if (isGameOver) {
        return;          // <--Stop updating if the game is over
    }


    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed;

         if (pipe.x + pipeWidth < bird.x && !pipe.passed) {      //<-- pipe passing successfully then
            score++;
            pipe.passed = true;             //<-- score one by one passing odf pipe
        } 
    });
   
     
    if (pipes.length > 0 && pipes[0].x < -pipeWidth) {     //<-- Remove pipes that have gone off-screen

        pipes.shift();
    }



    if (frame % 200 === 0) { //<-- Creates a new pipe every 200 frames
        createPipe();
    }
    frame++;
    
    


// 1. Check for bird hitting a pipe
    pipes.forEach(pipe => {
        
        if (
            bird.x < pipe.x + pipeWidth &&
            bird.x + bird.width > pipe.x &&         //<--  Check for collision with top pipe
            bird.y < pipe.topHeight
        ) {
            isGameOver = true;
        }
        
        if (
            bird.x < pipe.x + pipeWidth &&
            bird.x + bird.width > pipe.x &&
            bird.y + bird.height > canvas.height - pipe.bottomHeight     //<-- Check for collision with bottom pipe
        ) {
            isGameOver = true;
        }
    });

    // <-- Check for bird hitting top or bottom of the screen
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        isGameOver = true;
    }
}


// function gameLoop() {
//     update();       //<-- draw the game logic
//     draw();         //<-- draw a new state
//     requestAnimationFrame(gameLoop);
// }

function gameLoop() {
    update(); // <-- Run the game logic
    draw();   // <-- Draw the new state

    if (!isGameOver) {
        requestAnimationFrame(gameLoop);     // <-- Keep looping if the game is not over
    } else {
        alert('Game Over! Your score: ' + score);
    }
}


// function jump() {
//     bird.velocity = -4; // <-- Negative velocity makes it move up
// }

function jump() {
    if (!isGameOver) {
        bird.velocity = -4; // <-- Negative velocity makes it move up
    }
}


document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();                                 // <-- basically listen to spacebar command
    }
});

gameLoop();


// ctx.fillStyle = 'red';
// ctx.fillRect(100, 100, 50, 50);              //<-- draw a simple rectangle for a test

