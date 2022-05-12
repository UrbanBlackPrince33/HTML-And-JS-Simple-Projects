const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');

const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let timeId
let xDirection = -2;
let yDirection = 2;
let score = 0;





const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosittion = ballStart;

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];

    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),

    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),

    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]


function addBlock() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);
    }
}
addBlock();

const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

function drawBall() {
    ball.style.left = ballCurrentPosittion[0] + 'px';
    ball.style.bottom = ballCurrentPosittion[1] + 'px';
}

function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10;
                drawUser()
                break;

            }


    }
}

document.addEventListener('keydown', moveUser)

const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

function moveBall() {
    ballCurrentPosittion[0] += xDirection;
    ballCurrentPosittion[1] += yDirection;
    drawBall();
    checkForCollisions();
}

timeId = setInterval(moveBall, 10);

function checkForCollisions() {
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrentPosittion[0] > blocks[i].bottomLeft[0]
                && ballCurrentPosittion[0] < blocks[i].bottomRight[0])
            && ((ballCurrentPosittion[1] + ballDiameter) > blocks[i].bottomLeft[1]
                && ballCurrentPosittion[1] < blocks[i].topLeft[1])) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);
            changeDirection();
            score++
            scoreDisplay.innerHTML = score;

            if (blocks.length === 0) {
                scoreDisplay.innerHTML = 'You win!';
                clearInterval(timeId);
                document.removeEventListener('keydown', moveUser)
            }

        }

    }



    if (ballCurrentPosittion[0] >= (boardWidth - ballDiameter)
        || ballCurrentPosittion[1] >= (boardHeight - ballDiameter)
        || ballCurrentPosittion[0] <= 0) {
        changeDirection();
    }

    if (ballCurrentPosittion[0] > currentPosition[0] && ballCurrentPosittion[0] < currentPosition[0] + blockWidth
        && (ballCurrentPosittion[1] > currentPosition[1] && ballCurrentPosittion[1] < currentPosition[1] + blockHeight)) {
        changeDirection();
    }

    if (ballCurrentPosittion[1] <= 0) {
        clearInterval(timeId)
        scoreDisplay.innerHTML = 'You lose!';
        document.removeEventListener('keydown', moveUser)

    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return;
    }
    if (xDirection === 2 && yDirection == -2) {
        xDirection = -2;
        return;
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2;
        return;
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2;
        return;
    }


}





