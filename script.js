
const statusDisplay = document.querySelector('.game--status');

let gamerunning = true;

let currentPlayer = "X";

let gameArray = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();
function squareClicked(clickedCell, clickedCellIndex) {

    gameArray[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function checkWin() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameArray[winCondition[0]];
        let b = gameArray[winCondition[1]];
        let c = gameArray[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gamerunning = false;
        return;
    }

    let roundDraw = !gameArray.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gamerunning = false;
        return;
    }

    changePlayer();
}
function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
function handleCellClick(clickedCellEvent) {
/*
save the clicked html element in a variable
*/
    const clickedCell = clickedCellEvent.target;

    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index')
    );

    if (gameArray[clickedCellIndex] !== "" || !gamerunning) {
        return;
    }

    squareClicked(clickedCell, clickedCellIndex);
    checkWin();
}
function restartGame() {
    gamerunning = true;
    currentPlayer = "X";
    gameArray = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}
/*
event listeners to the eacg game cell and
restart button
*/
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', restartGame);
