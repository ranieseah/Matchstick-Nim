"use strict";
$(() => {
  const imgAdd =
    "https://atlas-content1-cdn.pixelsquid.com/assets_v2/11/1170343860455348201/jpeg-600/H10.jpg";

  const oneMatch = document.createElement("div");
  document.querySelector(".row").prepend(oneMatch);
  oneMatch.setAttribute("class", "match");
  const pic = document.createElement("img");
  pic.setAttribute("src", imgAdd);
  pic.setAttribute("height", "100px");
  oneMatch.append(pic);
});
