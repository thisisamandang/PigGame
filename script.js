"use strict";

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

let currentScore, score, activePlayer, playing;


const start = function () {
    currentScore = 0;
    score = [0, 0];
    activePlayer = 0;
    playing = true;

    player0.classList.add("player--active");
    player1.classList.remove("player--active");
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    diceEl.classList.add("hidden")

    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;

}


start();


const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    // document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
    activePlayer = activePlayer === 0 ? 1 : 0;
    // document.querySelector(`.player--${activePlayer}`).classList.add("player--active");
    player0.classList.toggle("player--active");// toggle: If the class is already applied then it removes if not then it adds.
    player1.classList.toggle("player--active");
}

btnRoll.addEventListener("click", function () {
    if (playing) { // 1. Generating a random dice number
        let diceNo = Math.trunc((Math.random() * 6) + 1);
        console.log(diceNo);
        // 2. Showing that dice number
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${diceNo}.png`;
        // 3. Checking if that dice is 1, if true : switch to next player
        if (diceNo !== 1) {
            currentScore += diceNo;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {//Switching player    
            switchPlayer();
        }
    }
})

btnHold.addEventListener("click", function () {
    if (playing) {
        score[activePlayer] += Number(currentScore);
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

        if (score[activePlayer] >= 20) {
            playing = false;
            diceEl.classList.add("hidden")
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        } else {

            switchPlayer();
        }
    }
})


btnNew.addEventListener("click", start);
