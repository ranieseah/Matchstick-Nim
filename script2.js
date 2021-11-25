const gameBoard = { 1: 1, 2: 0, 3: 4, 4: 1 };

console.log(gameBoard);

console.log(Object.keys(gameBoard).length);

currentRow = 0;
console.log(gameBoard[2]);

let gameBoardMax = [];
for (let i = 1; i <= Object.keys(gameBoard).length; i++) {
  gameBoardMax.push(gameBoard[i]);
}

gameBoardMax.sort(function (a, b) {
  return b - a;
});
console.log("hi", gameBoardMax[0]);

currentTurn = 1;
console.log(currentTurn === 1 || gameBoardMax[0] === 1);

let skipAlert = 0;
(currentTurn === 1 && gameBoardMax[0] === 1) === true
  ? (skipAlert = 0)
  : (skipAlert = 1);

console.log(skipAlert);
