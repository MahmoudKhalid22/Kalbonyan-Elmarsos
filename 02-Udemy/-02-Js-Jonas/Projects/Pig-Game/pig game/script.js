"use strict";

// SELECTING ELEMENTS
const last_score_0 = document.getElementById("score--0");
const last_score_1 = document.getElementById("score--1");
const dice = document.querySelector(".dice");
const player_0 = document.querySelector(".player--0");
const player_1 = document.querySelector(".player--1");
const current_score_0 = document.getElementById("current--0");
const current_score_1 = document.getElementById("current--1");
const roll_dice = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let activePlayer, currentScore, storeCurrentScore, score, playing;

function starting() {
  activePlayer = 0;
  currentScore = 0;
  storeCurrentScore = 0;
  score = [0, 0];
  playing = true;

  last_score_0.textContent = 0;
  last_score_1.textContent = 0;
  dice.classList.add("hidden");

  current_score_0.textContent = 0;
  current_score_1.textContent = 0;
  player_0.classList.remove("player--winner");
  player_1.classList.remove("player--winner");

  player_0.classList.add("player--active");
  player_1.classList.remove("player--active");
}
starting();

// ROLLING DICE FUNCTIONALITY

roll_dice.addEventListener("click", current);

function current() {
  // GENERATING RANDOM DICE ROLL
  if (playing) {
    const randomNum = parseInt(Math.random() * 6) + 1;
    // DISPLAY DICE
    dice.classList.remove("hidden");
    dice.src = `dice-${randomNum}.png`;
    // CHECK FOR ROLLED 1

    if (randomNum !== 1) {
      currentScore += randomNum;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
}

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
}

// hold
btnHold.addEventListener("click", hold);

function hold() {
  // GET THE VALUE OF THE CURRENT SCORE TO MAIN SCORE
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // CHECK IF THE MAIN SCORE AT LEAST 100
  }
  if (score[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
    playing = false;
  } else {
    switchPlayer();
  }
}

btnNew.addEventListener("click", starting);
