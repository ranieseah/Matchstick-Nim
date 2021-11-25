# Matchstick-Nim
SEI33 Project 1 (Javascript, HTML, CSS)

GitHub Pages: https://ranieseah.github.io/Matchstick-Nim/

# The Game
- objective of the game is to not pick the last matchstick.
- user can define the size of the board between 2 - 9 rows. Any other values keyed in will generate a game board of 4 rows by default.

# What isnt working
timer: only works for autoplay. if user makes any moves that results in alerts like confirming end of turn without selecting any matchsticks, or picking the same number of matchsticks as the previous round, the timer stops. because there's a `clearInterval` set on the confirm end of turn button.

# What is working
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
