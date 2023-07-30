//1. Despot some money
//2. Determine number of lines to bet on
//3. Collect a bet amount
//4.Spin the slot machine
//5. check if the user won
//6. give the user their winning
//7. play again
const prompt = require("prompt-sync")();
// global variable
const ROWS = 3;
const COLS = 3;

//specifies how many times each symbol should appear on the slot machine reels.
const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};
//multiply each symbols
const SYMBOLS_values = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

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

const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(bet);
    //check bet is number or less than 0 or more than balance?
    if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log("Invalid bet, try again");
    } else {
      return numberBet;
    }
  }
};

const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      // This nested loop adds 'count' number of the current 'symbol' to the 'symbols' array.
      symbols.push(symbol);
    }
  }

  const reels = [];
  //iterates through the columns of the reels (3 columns in this case)
  for (let i = 0; i < COLS; i++) {
    reels.push([]); //add nest array
    // Create a copy of the 'symbols' array for each reel to ensure each reel starts with the same set of symbols.
    const reelSymbols = [...symbols];
    //iterates through the rows of the current reel
    for (let j = 0; j < ROWS; j++) {
      // Generate a random index within the range of the current 'reelSymbols' array.
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);

      const selectedSymbol = reelSymbols[randomIndex]; // Retrieve the symbol at the randomly selected index.
      reels[i].push(selectedSymbol); // Add the selected symbol to the current reel

      reelSymbols.splice(randomIndex, 1); // Remove the selected symbol from 'reelSymbols' to avoid duplicates in the same reel.
    }
  }
  return reels; //reels' array as the result of the 'spin' function
};

// takes 'reels' as its input and  switching its rows and columns.
const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    rows.push([]); // populate each row with transposed elements later.
    //iterates through the columns of the original 'reels'
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};
//display slot machine
const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines); //can bet base on your balance
const reels = spin();
const rows = transpose(reels);
printRows(rows);
