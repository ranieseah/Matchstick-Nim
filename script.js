"use strict";
$(() => {
  const imgAdd =
    "https://atlas-content1-cdn.pixelsquid.com/assets_v2/11/1170343860455348201/jpeg-600/H10.jpg";

  function oneMatch() {
    const oneMatch = document.createElement("div");
    document.querySelector(".row").prepend(oneMatch);
    oneMatch.setAttribute("class", "match");
    const pic = document.createElement("img");
    pic.setAttribute("src", imgAdd);
    pic.setAttribute("height", "100px");
    oneMatch.append(pic);
  }

  function row(num) {
    const lineBreak = document.createElement("br");
    document.querySelector(".row").prepend(lineBreak);

    for (let i = num; i > 0; i--) {
      oneMatch();
    }
  }

  function game(num) {
    for (let i = num; i > 0; i--) {
      row(i);
    }
  }
  game(6);

  document.querySelector(".row").addEventListener("click", turnGrey);
  function turnGrey(e) {
    console.log("hi");
    e.target.setAttribute("class", "selected");
    console.log(e.target);
  }
});
