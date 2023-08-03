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
const SYMBOLS_VALUES = {
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
  return reels; // result of the 'spin' function
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
    let rowString = ""; // for build the output for each row
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;

      // If not at the last element of the 'row', add a separator (" | ") to the 'rowString'.
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

//calculate the total winning amount based on the spin result
const getWinning = (rows, bet, lines) => {
  let winning = 0;
  let anyLineWin = false; // Flag to track if any line wins occur

  // Check if all symbols in the row are the same
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      // Calculate winning amount based on the bet and symbol value
      winning += bet * SYMBOLS_VALUES[symbols[0]];
      anyLineWin = true; // Set the flag to true if any line wins occur
    }
  }

  if (!anyLineWin) {
    console.log("You lost!"); // Display "You lost!" if no line wins occur
  }

  return winning;
};

const game = () => {
  let balance = deposit(); // Initialize player's balance from the deposit function

  // Main game loop
  while (true) {
    console.log(`You have a balance of $${balance}`);

    // Get the number of lines to play
    const numberOfLines = getNumberOfLines();

    // Get the bet amount based on the balance and number of lines
    const bet = getBet(balance, numberOfLines);

    // Deduct the bet amount from the balance
    balance -= bet * numberOfLines;

    // Spin the slot machine reels and get the result
    const reels = spin();

    // Transpose the reel results to get rows
    const rows = transpose(reels);

    // Display the visual representation of the spin result
    printRows(rows);

    // Calculate the winning amount based on the spin result
    const winnings = getWinning(rows, bet, numberOfLines);

    // Add the winnings to the player's balance
    balance += winnings;

    // Display the winning amount and updated balance
    console.log(`You get $ ${winnings.toString()}`);
    console.log(`Your balance is $ ${balance}`);

    // Check if the player's balance is depleted
    if (balance <= 0) {
      console.log("You ran out of money!");
      break; // Exit the game loop
    }

    // Ask the player if they want to play again
    const playAgain = prompt("Do you want to play again? (y/n)");

    // If the player chooses not to play again, exit the game loop
    if (playAgain != "y") {
      break;
    }
  }
};

game();
