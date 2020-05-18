const slots = document.querySelectorAll(".slot");
const result = document.querySelector("#result");
const reset = document.querySelector("#reset-button");
const player1 = "X";
const aiPlayer = "O";

var gameBoard;
var winner;

const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

init();

/* FUNCTION TO INITIALIZE THE GAME */
function init() {
  gameBoard = Array.from(Array(9).keys());
  result.innerHTML = "";
  winner = false;
  slots.forEach(item => {
    item.addEventListener("click", userClick, false);
    item.innerHTML = "";
  });
}

/* EVENT TO RESET OR INITIALIZE THE GAME AGAIN */
reset.addEventListener("click", init, false);

/* USER CLICK AND AI CLICK */
function userClick(slot) {
  let id = slot.target.id;
  if (!winner) {
    if (typeof gameBoard[id] === "number") {
      gameBoard[id] = player1;
      document.getElementById(id).innerText = player1;
      removeClick(id);
      checkWinner(player1);
      if (!winner && getFreeSlots().length === 0) {
        setWinner("D");
      } else if (!winner) {
        aiClick();
      }
    }
  }
}

/* FUNCTION TO SET AI CLICK */
function aiClick() {
  let freeSlots = getFreeSlots();
  let pos = freeSlots[Math.floor(Math.random() * freeSlots.length)];
  gameBoard[pos] = aiPlayer;
  document.getElementById(pos).innerText = aiPlayer;
  removeClick(pos);
  checkWinner(aiPlayer);
}

/* CHECKING WINNER AFTER A MOVE */
function checkWinner(player) {
  let arrayPlayer = createArrayPlayer(player);
  for (let item of winnerCombos) {
    if (
      arrayPlayer.indexOf(item[0]) > -1 &&
      arrayPlayer.indexOf(item[1]) > -1 &&
      arrayPlayer.indexOf(item[2]) > -1
    ) {
      setWinner(player);
      break;
    }
  }
}

/* SETTING THE WINNER */
function setWinner(player) {
  winner = true;
  if (player !== "D") {
    result.innerText = `${player} WINS!`;
  } else {
    result.innerText = `DRAW :(`;
  }
}

/* CREATING AN ARRAY FOR A SPECIFIC PLAYER */
function createArrayPlayer(player) {
  let array = [];
  for (let [index, item] of gameBoard.entries()) {
    if (item === player) {
      array.push(index);
    }
  }
  return array;
}

/* REMOVING EVENT CLICK FOR A SLOT */
function removeClick(id) {
  let item = document.getElementById(id);
  item.removeEventListener("click", userClick, false);
}

/* GETTING FREE SLOT FROM THE ACTUAL BOARD */
function getFreeSlots() {
  return gameBoard.filter(item => typeof item === "number");
}
