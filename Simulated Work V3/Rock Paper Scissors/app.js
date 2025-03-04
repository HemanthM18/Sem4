const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('button');
let userChoice;
let computerChoice;
let result;

possibleChoices.forEach(button => 
  button.addEventListener('click', (e) => {
    userChoice = e.target.closest('button').id; // In case the click is on the image
    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice();
    getResult();
  })
);

function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  if (randomNumber === 1) {
    computerChoice = 'rock';
  }
  if (randomNumber === 2) {
    computerChoice = 'paper';
  }
  if (randomNumber === 3) {
    computerChoice = 'scissors';
  }
  computerChoiceDisplay.innerHTML = computerChoice;
}

function getResult() {
  if (userChoice === computerChoice) {
    result = 'It\'s a tie!';
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'scissors' && computerChoice === 'paper') ||
    (userChoice === 'paper' && computerChoice === 'rock')
  ) {
    result = 'You win!';
  } else {
    result = 'You lose!';
  }
  resultDisplay.innerHTML = result;
}
