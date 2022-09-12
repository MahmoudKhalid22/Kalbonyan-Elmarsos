"use strict";

// console.log(document.querySelector('.message').textContent
// );
// document.querySelector('.message').textContent = 'correct number';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
document.querySelector(".number").textContent = secretNumber;
let score = 20;
let highScore = 0;
const messege = function (dmessege) {
  document.querySelector(".message").textContent = dmessege;
};
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  //when there is no input #60b347
  if (!guess) {
    messege("No Number");
  }
  // the guess is wrong
  else if (guess !== secretNumber) {
    if (score > 0) {
      messege(guess > secretNumber ? "too high" : "too low");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      messege("Lose");
      score = 0;
    }
  }
  // when player wins
  else if (guess === secretNumber) {
    messege("Correct Number");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".number").textContent = guess;
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } else {
    messege("Lose");
    score = 0;
  }

  document.querySelector(".again").addEventListener("click", function () {
    messege("start gussing");
    score = 20;
    document.querySelector(".score").textContent = score;
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector(".number").textContent = "?";
    document.querySelector(".number").style.width = "15rem";
    document.querySelector(".guess").value = "";
    document.querySelector("body").style.backgroundColor = "#222";
    if (guess === secretNumber) {
      document.querySelector(".number").textContent = guess;
    }
  });
});
