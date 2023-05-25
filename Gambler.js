
const prompt = require("prompt-sync")();


const ROWS = 3;
const COLS = 3;

const symbols_count ={
    A: 2,
    B:4,
    C:6,
    D:8
}
const symbol_value={
    A: 5,
    B:4,
    C:3,
    D:2
}



// Get the amount from the gambler
const deposit = () =>{

    while (true){
        const depositAmount = prompt("Enter a deposit number : ");
        const numberDepositAmount = parseFloat(depositAmount);

        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0 ){
            console.log("Enter valid number and try again!");

        }
        else{
            return numberDepositAmount;
        }

    }
};

//Get the number of lines 

const getNumberOfLines = () =>{

    while (true){
        const lines = prompt("Enter the number of lines that you want to bet on (1-3) : ");
        const numberOfLines = parseFloat(lines);


        if (isNaN(numberOfLines) || numberOfLines < 0 || numberOfLines > 3 ){
            console.log("Enter valid number of lines and try again!");

        }
        else{
            return numberOfLines;
        }

    }
};


// get the bet that user wants

const getBet = (balance, lines) => {
    while (true){
        const bet = prompt("Enter the bet that you want per line: ");
        const yourBet = parseFloat(bet);


        if (isNaN(yourBet) || yourBet <= 0 || yourBet > (balance / lines)){
            console.log("Enter valid bet then Try again!");

        }
        else{
            return yourBet;
        }

    }
};

//spin the machine
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(symbols_count)) {
        for (let i =0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = [];
    for (let i =0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j=0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);


        }
    }

    return reels;
};

const transpote = (reels) => {
    const rows = [];

    for (let i=0; i < ROWS; i++){
        rows.push([]);
        for (let j=0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows ) {
        let rowString = "";
        for (const [i, symbol] of row.entries()){
            rowString += symbol
            if (i != row.length - 1 ) {
                rowString += " | "

            }
            
        }
        console.log(rowString)
    }
}

//check if they win or loose 

const getWinnings = (rows, bet, lines) => {
    let winnings = 0 ;
    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0] ) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * symbol_value[symbols[0]]
        }
    }
    return winnings;
}

// give the user thier winnings




const game = () => {
    
        let balance  = deposit();


        while (true) {
            console.log("Your balance is Rs. " + balance);
            const numberOfLines = getNumberOfLines();
            const bet = getBet(balance, numberOfLines);
            balance -= bet * numberOfLines;
            const reels = spin();
            const rows = transpote(reels);
            printRows(rows);
            const winnings = getWinnings(rows, bet , numberOfLines );
            console.log ("You won, Rs. " + winnings.toString());
                if (balance <= 0) {
                    console.log("You ran ut of money");
                    break;
                }

                const playAgain = prompt ("Do you want to play again (y/n)?");

                if (playAgain != "y") break;
           
        }
};

game();



