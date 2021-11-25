# Matchstick-Nim
SEI33 Project 1 (Javascript, HTML, CSS)

GitHub Pages: https://ranieseah.github.io/Matchstick-Nim/

# The Game
- objective of the game is to not pick the last matchstick.
- user can define the size of the board between 2 - 9 rows. Any other values keyed in will generate a game board of 4 rows by default.

# What isnt working
timer: only works for autoplay. if user makes any moves that results in alerts like confirming end of turn without selecting any matchsticks, or picking the same number of matchsticks as the previous round, the timer stops. because there's a `clearInterval` set on the confirm end of turn button.
  - did try the timer method with a end time, and using the current clock time Date.now(), but it didnt work out
  - ended up using setInterval method, but its messy to implement because of the multiple functions, and scoping issues.

# What is working
### simplifying front end
- being able to select and deselect the matchsticks
```
function turnGrey(e) {
    if (e.target.className === "selected") {
      e.target.setAttribute("class", "unselected");
    } else {
      e.target.setAttribute("class", "selected");
    }
  }
 ```
 - set a seperate class for matchsticks at the end of each round so that it can no longer be deselected
 ```
 for (let item of toConfirm) {
    item.setAttribute("class", "confirm");
  }
 ```
 - being able to reset all selected matchsticks
 ```
  const toReset = document.querySelectorAll(".selected");
  for (let item of toReset) {
      item.setAttribute("class", "unselected");
   }
```
### simplifying back end
- simplifying the back end as an object
```
gameBoard = {1:1, 2:2, 3:3, 4:4}
```
- for autoplay to work, need to ensure the code didnt randomly pick an empty row. thus, use while loop
```
while (gameBoard[currentRow] === undefined || gameBoard[currentRow] === 0) {
   currentRow = Math.ceil(Math.random() * Object.keys(gameBoard).length);
}
```
- random pick number of matchsticks, but cannot exceed the number of matchsticks remaining in the row
```
currentTurn = Math.ceil(
              Math.random() * Math.min(gameBoard[currentRow], 3)
            );
```
- now, to update the front end to reflect the autoplay choices
![image](https://user-images.githubusercontent.com/92285763/143466036-eaa80b84-e956-4d50-a2ee-7cfa1fa207b4.png)
```
let turnedConfirm = 0;
   for (let i = 1; turnedConfirm < currentTurn; i++) {
      const randomMatch = "match" + currentRow + i;
     if (document.querySelector("#" + randomMatch).childNodes[0].className !== "confirm") {
        turnedConfirm++;
        document.querySelector("#" + randomMatch).childNodes[0].setAttribute("class", "confirm");
     }
   }
   
```
### use of classes

Class was used to create functions like:
- checkStatus() 
  - checks the status of the Game Board after each turn to determine:
    1. how many sticks left
    2. one stick left, meaning the next player is the losing party
    3. no sticks left, current player is the losing part
- move()
  1. updates the backend gameboard
  2. runs checkStatus()
  3. stores the moves for comparison on the next round and updates onto HTML
- switchPlayer()
  - updates the classes, which changes the color, controlled by CSS. 

On hindsight, the use of class made it difficult to rearrange and tidy up by functions. Might have had a better outcome if class wasnt used.

# What could be done better
the flow and the tidiness of the code. the code seems to be jumping back and forth because i keep building it line by line, function by function. i didnt plan out the whole big picture then work to the details. 
