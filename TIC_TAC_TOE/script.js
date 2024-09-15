const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const turnDisplay = document.getElementById('turnDisplay');
const resultMessage = document.getElementById('resultMessage');
const restartButton = document.getElementById('restartButton');
const modeSelection = document.getElementById('modeSelection');
const pvpButton = document.getElementById('pvp');
const pvcButton = document.getElementById('pvc');

const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let isOTurn = false;
let vsComputer = false;

pvpButton.addEventListener('click', () => {
    vsComputer = false;
    startGame();
});

pvcButton.addEventListener('click', () => {
    vsComputer = true;
    startGame();
});

restartButton.addEventListener('click', startGame);

function startGame() {
    isOTurn = false;
    turnDisplay.textContent = "Player X's Turn";
    resultMessage.textContent = '';
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS); // Remove X class
        cell.classList.remove(O_CLASS); // Remove O class
        cell.textContent = ''; // Clear the content
        cell.removeEventListener('click', handleClick); // Remove old event listeners
        cell.addEventListener('click', handleClick, { once: true }); // Add new event listeners
    });
}
const buttons = document.querySelectorAll('#modeSelection button');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

function handleClick(e) {
    const cell = e.target;
    const currentClass = isOTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        if (vsComputer && !isOTurn) {
            setTimeout(computerMove, 500); // Delay for realism
        }
    }
}
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass === X_CLASS ? 'X' : 'O'; // Add 'X' or 'O' inside the cell
}


function swapTurns() {
    isOTurn = !isOTurn;
    turnDisplay.textContent = isOTurn ? "Player O's Turn" : "Player X's Turn";
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function endGame(draw) {
    if (draw) {
        resultMessage.textContent = "It's a Draw!";
    } else {
        resultMessage.textContent = `${isOTurn ? "O's" : "X's"} Wins!`;
    }
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function computerMove() {
    const availableCells = [...cells].filter(cell => 
        !cell.classList.contains(X_CLASS) && !cell.classList.contains(O_CLASS)
    );

    if (availableCells.length === 0) return;

    const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
    randomCell.click(); 
}
