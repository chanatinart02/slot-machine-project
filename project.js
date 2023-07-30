//1. Despot some money
//2. Determine number of lines to bet on
//3. Collect a bet amount
//4.Spin the slot machine
//5. check if the user won
//6. give the user their winning
//7. play again
const prompt = require("prompt-sync")();

const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDeposit = parseFloat(depositAmount);
    //check deposit is number?
    if (isNaN(numberDeposit) || numberDeposit <= 0) {
      console.log("Invalid deposit amount, try again");
    } else {
      return numberDeposit;
    }
  }
};

const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the lines to bet on (1-3): ");
    const numberOfLines = parseFloat(lines);
    //check numberOfLines is number?
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log("Invalid number of lines, try again");
    } else {
      return numberOfLines;
    }
  }
};

let balance = deposit();
const numberOfLines = getNumberOfLines();
