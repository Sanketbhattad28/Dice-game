'use strict';

const scoreEl0 = document.querySelector('#score--0');
const scoreEl1 = document.getElementById('score--1');
const playerEl0 = document.querySelector('.player--0');
const playerEl1 = document.querySelector('.player--1');
const currentEl0 = document.querySelector('#current--0');
const currentEl1 = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const rollDiceEl = document.querySelector('.btn--roll');
const holdEl = document.querySelector('.btn--hold');
const newGameEl = document.querySelector('.btn--new');

//Starting condition
scoreEl0.textContent = 0;
scoreEl1.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const addCurrentScoreToTotalScore = (playerTotalScore, playerCurrentScore) => {
  let num = Number(playerTotalScore.textContent);
  num += Number(playerCurrentScore.textContent);
  playerTotalScore.textContent = num;
};

const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer == 0 ? 1 : 0;
  playerEl0.classList.toggle('player--active');
  playerEl1.classList.toggle('player--active');
};

const winnerFoundHandler = CurrentPlayer => {
  CurrentPlayer.classList.add('player--winner');
  CurrentPlayer.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

const disableRollAndHoldButton = () => {
  rollDiceEl.removeEventListener('click', () => {
    console.log('11');
  });
  holdEl.removeEventListener('click');
};

//Rolling dice condition
rollDiceEl.addEventListener('click', () => {
  if (playing) {
    //Generate random dice number
    let diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    //display dice with the correct random number generated
    diceEl.src = `dice-${diceNumber}.png`;

    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    }

    if (diceNumber === 1) {
      switchPlayer();
    }
  }
});
//Hold functionality
holdEl.addEventListener('click', () => {
  if (playing) {
    if (playerEl0.classList.contains('player--active')) {
      addCurrentScoreToTotalScore(scoreEl0, currentEl0);
      if (Number(scoreEl0.textContent) >= 50) {
        winnerFoundHandler(playerEl0);
        playing = false;
      }
      switchPlayer();
    } else {
      addCurrentScoreToTotalScore(scoreEl1, currentEl1);
      if (Number(scoreEl1.textContent) >= 50) {
        winnerFoundHandler(playerEl1);
        playing = false;
      }
      switchPlayer();
    }
  }
});

//New game functionality
newGameEl.addEventListener('click', () => {
  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  diceEl.classList.add('hidden');
  playerEl0.classList.remove('player--winner');
  playerEl1.classList.remove('player--winner');
  playing = true;
});
