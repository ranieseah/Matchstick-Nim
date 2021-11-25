"use strict";
$(() => {
  const imgAdd =
    "https://atlas-content1-cdn.pixelsquid.com/assets_v2/11/1170343860455348201/jpeg-600/H10.jpg";

  let gameValue = 5;
  const gameBoard = {};
  let currentTurn = 0;
  let currentRow = 0;
  let playerTurn = "Player 1";
  let timerTogOn = "";
  let autoplay = 0;

  function oneMatch(row, slot) {
    const oneMatch = document.createElement("div");
    document.querySelector(".row").prepend(oneMatch);
    oneMatch.setAttribute("class", "match");
    oneMatch.setAttribute("value", row);
    let matchId = "match" + row + slot;
    console.log(matchId);
    oneMatch.setAttribute("id", matchId);
    const pic = document.createElement("img");
    pic.setAttribute("src", imgAdd);
    pic.setAttribute("class", "unselected");
    pic.setAttribute("height", "100px");
    oneMatch.append(pic);
  }

  function row(num) {
    const lineBreak = document.createElement("br");
    document.querySelector(".row").prepend(lineBreak);

    for (let i = num; i > 0; i--) {
      oneMatch(num, i);
      document.querySelectorAll(".match");
    }
  }

  function game(num) {
    for (let i = num; i > 0; i--) {
      row(i);
    }
  }

  function buildGameBoard(gameRow) {
    for (let i = 1; i <= gameRow; i++) {
      gameBoard[i] = i;
    }
    console.log("game board built:");
    console.log(gameBoard);
  }

  function turnGrey(e) {
    if (e.target.className === "selected") {
      e.target.setAttribute("class", "unselected");
    } else {
      e.target.setAttribute("class", "selected");
    }
  }

  function nextTurn() {
    console.log(
      playerTurn,
      "has made his choice. let see what he has selected....."
    );
    let gameBoardMax = [];
    for (let i = 1; i <= Object.keys(gameBoard).length; i++) {
      gameBoardMax.push(gameBoard[i]);
    }

    gameBoardMax.sort(function (a, b) {
      return b - a;
    });

    if (currentTurn === 0) {
      alert("hey! you didnt make a selection..");
    } else if (
      ((playerTurn === "Player 1" &&
        currentTurn == document.querySelector("#p1prevTurn").innerText) ||
        (playerTurn === "Player 2" &&
          currentTurn == document.querySelector("#p2prevTurn").innerText)) &&
      autoplay === 0 &&
      gameBoardMax[0] > 1
    ) {
      alert(
        "sorry! you have to pick a different number of matches from previous round!"
      );
      console.log(!(currentTurn === 1 && gameBoardMax[0] === 1));
    } else {
      autoplay = 0;
      const toConfirm = document.querySelectorAll(".selected");
      switch (playerTurn) {
        case "Player 1":
          player1.move("p1", currentRow, currentTurn);
          for (let item of toConfirm) {
            item.setAttribute("class", "confirm");
          }
          break;
        case "Player 2":
          player2.move("p2", currentRow, currentTurn);
          for (let item of toConfirm) {
            item.setAttribute("class", "confirm");
          }
          break;
      }

      currentRow = 0;
      document.querySelector("#curRow").innerText = "";
      currentTurn = 0;
    }
  }

  class Player {
    constructor(name, opponent, pCurrentRow, pLastRow, pLastTurn) {
      (this.name = name),
        (this.opponent = opponent),
        (this.pCurrentRow = pCurrentRow),
        (this.pLastRow = pLastRow),
        (this.pLastTurn = pLastTurn);
    }

    switchPlayer() {
      playerTurn = this.opponent;
      if (playerTurn === "Player 1") {
        function switchP1() {
          document.querySelector("body").setAttribute("class", "player1");
          document.querySelector("#start").setAttribute("class", "player1");
          document.querySelector("#next").setAttribute("class", "player1");
          document
            .querySelector("h1")
            .setAttribute("style", "text-align: left");
        }
        switchP1();
      } else {
        function switchP2() {
          document.querySelector("body").setAttribute("class", "player2");
          document.querySelector("#start").setAttribute("class", "player2");
          document.querySelector("#next").setAttribute("class", "player2");
          document
            .querySelector("h1")
            .setAttribute("style", "text-align: right");
        }
        switchP2();
      }
      if (timerTogOn === true) {
        const timeDisplay = document.createElement("span");
        timeDisplay.setAttribute("id", "timer");
        document.querySelector("h1").append(timeDisplay);
        let timerNum = 5;
        const timerInt = setInterval(autoTimer, 1000);
        function autoTimer() {
          document.querySelector("#timer").innerText = timerNum;
          if (timerNum > 0) {
            timerNum = timerNum - 1;
          }
        }

        function stopTimer() {
          clearInterval(timerInt);
          document.querySelector("#timer").innerText = "";
        }

        setTimeout(timesUp, 6000);
        function timesUp() {
          if (timerNum <= 0) {
            const toReset = document.querySelectorAll(".selected");
            for (let item of toReset) {
              item.setAttribute("class", "unselected");
            }
            currentRow = 0;
            currentTurn = 1;
            while (
              gameBoard[currentRow] === undefined ||
              gameBoard[currentRow] === 0
            ) {
              currentRow = Math.ceil(
                Math.random() * Object.keys(gameBoard).length
              );
            }

            currentTurn = Math.ceil(
              Math.random() * Math.min(gameBoard[currentRow], 3)
            );
            console.log("autoplay chose: ", currentRow, currentTurn);
            alert(
              "TOO SLOW! autoplay has chosen: [Row: " +
                currentRow +
                "] , [number of Match: " +
                currentTurn +
                "]"
            );
            autoplay = 1;
            let turnedConfirm = 0;
            for (let i = 1; turnedConfirm < currentTurn; i++) {
              const randomMatch = "match" + currentRow + i;
              if (
                document.querySelector("#" + randomMatch).childNodes[0]
                  .className !== "confirm"
              ) {
                turnedConfirm++;

                console.log(randomMatch);
                document
                  .querySelector("#" + randomMatch)
                  .childNodes[0].setAttribute("class", "confirm");
              }
            }
            nextTurn();
          }
        }
        document.querySelector("#next").addEventListener("click", stopTimer);
      }
    }

    checkStatus() {
      let sum = 0;
      for (let i = 1; i <= Object.keys(gameBoard).length; i++) {
        sum += gameBoard[i];
      }
      if (sum === 0) {
        console.log(
          "BOOMZ.",
          this.name,
          "lost.",
          this.name,
          "took the last matchstick"
        );

        document.querySelector("h1").innerText = `${this.name} LOST.`;
        document.querySelector("#start").innerText = "New Game?";
        document.querySelector("#start").value = "new";
        document.querySelector("#start").setAttribute("class", "");
        document
          .querySelector("#start")
          .setAttribute("style", "background-color: yellow");
        document.querySelector("#next").remove();
      } else if (sum === 1) {
        console.log(
          "nice going,",
          this.name,
          ", you're a winner, you! you left 1 match stick for your opponent!"
        );
        document.querySelector(
          "h1"
        ).innerHTML = `${this.name} made a winning move. <br> ${this.opponent} accept your fate and select the last matchstick.`;
        this.switchPlayer();
      } else {
        console.log("go on, there are", sum, "matchsticks left");
        document.querySelector(
          "h1"
        ).innerText = `${this.opponent}, make your move`;
        console.log(gameBoard);
        this.switchPlayer();
      }
    }
    move(player, row, value) {
      gameBoard[row] -= value;
      this.checkStatus();
      this.pLastRow = row;
      this.pLastTurn = value;
      document.querySelector("#" + player + "prevRow").innerText =
        this.pLastRow;
      document.querySelector("#" + player + "prevTurn").innerText =
        this.pLastTurn;
    }
  }

  const player1 = new Player("Player 1", "Player 2");
  const player2 = new Player("Player 2", "Player 1");

  document.querySelector("#start").addEventListener("click", pushStartButton);
  function pushStartButton(e) {
    if (e.target.value === "start") {
      timerTogOn = timerOn.checked;
      document.querySelector("#input-box").value.length !== 1 ||
      document.querySelector("#input-box").value < 2
        ? (gameValue = 4)
        : (gameValue = document.querySelector("#input-box").value);
      game(gameValue);
      buildGameBoard(gameValue);
      document.querySelector("#input-box").remove();
      document.querySelector("#player").innerText = "Player 1, make your move.";
      document.querySelector("body").setAttribute("class", "player1");
      document.querySelector("#timerOn").remove();
      document.querySelector("#timerLabel").remove();
      document.querySelector("#start").innerText = "Reset Turn";
      document.querySelector("#start").setAttribute("class", "player1");
      e.target.value = "reset";
      const btn = document.createElement("button");
      btn.innerText = "Confirm End of Turn";
      btn.setAttribute("id", "next");
      btn.setAttribute("class", "player1");
      document.querySelector(".row").append(btn);
      document
        .querySelector("#rowSelect")
        .setAttribute("style", "display:block");
      document
        .querySelector("#prevplay1")
        .setAttribute("style", "display:block");
      document
        .querySelector("#prevplay2")
        .setAttribute("style", "display:block");
      if (timerTogOn === true) {
        const timeDisplay = document.createElement("span");
        timeDisplay.setAttribute("id", "timer");
        document.querySelector("h1").append(timeDisplay);
        let timerNum = 5;
        const timerInt = setInterval(autoTimer, 1000);
        function autoTimer() {
          document.querySelector("#timer").innerText = timerNum;
          timerNum = timerNum - 1;
          console.log("hi");
        }
        function stopTimer() {
          if (currentTurn > 0) {
            clearInterval(timerInt);
            document.querySelector("#timer").innerText = "";
          }
        }

        setTimeout(timesUp, 6000);
        function timesUp() {
          if (timerNum <= 0) {
            const toReset = document.querySelectorAll(".selected");
            for (let item of toReset) {
              item.setAttribute("class", "unselected");
            }
            currentRow = 0;
            currentTurn = 1;
            stopTimer();
            currentRow = Math.ceil(Math.random() * gameValue);
            console.log("current row:", currentRow);
            currentTurn = Math.ceil(Math.random() * Math.min(currentRow, 3));
            console.log("current turn:", currentTurn);
            alert(
              "TOO SLOW! autoplay has chosen: [Row: " +
                currentRow +
                "] , [number of Match: " +
                currentTurn +
                "]"
            );
            for (let i = 1; i <= currentTurn; i++) {
              const randomMatch = "match" + currentRow + i;
              console.log(randomMatch);
              document
                .querySelector("#" + randomMatch)
                .childNodes[0].setAttribute("class", "confirm");
            }
            nextTurn();
          }
        }
        document.querySelector("#next").addEventListener("click", stopTimer);
      }
      document.querySelector("#next").addEventListener("click", nextTurn);
    } else if (e.target.value === "reset") {
      if (currentRow === 0) {
        alert(
          "eh? you didnt click anything what. nothing to reset leh. To restart the game, refresh the page :)"
        );
      } else {
        console.log(document.querySelectorAll(".selected"));
        const toReset = document.querySelectorAll(".selected");
        for (let item of toReset) {
          item.setAttribute("class", "unselected");
        }
        currentTurn = 0;
        currentRow = 0;
        document.querySelector("#curRow").innerText = "";
        console.log("reset button pressed");
        alert("ok la - u can pick another row now..");
      }
    } else {
      location.reload();
    }
  }

  document.querySelector(".row").addEventListener("click", gamePlay);
  function gamePlay(e) {
    if (
      e.target.nodeName === "IMG" &&
      document.querySelector("#start").value === "reset"
    ) {
      if (
        currentRow === 0 ||
        currentRow === e.target.parentElement.attributes[1].nodeValue
      ) {
        if (e.target.className === "unselected") {
          if (currentTurn === 3) {
            alert("Sorry, max moves is 3 matchsticks per round");
          } else {
            currentRow = e.target.parentElement.attributes[1].nodeValue;
            turnGrey(e);
            currentTurn += 1;
            console.log("matchsticks select count:", currentTurn);
            document.querySelector("#curRow").innerText = currentRow;
          }
        } else if (e.target.className === "confirm") {
          alert("oops! you cant unburn a matchstick from the previous round.");
        } else if (e.target.className === "selected") {
          turnGrey(e);
          currentTurn -= 1;
          console.log("matchsticks select count:", currentTurn);
        }
      } else {
        alert("illegal move, you cannot select across rows");
      }
    }
  }
});
