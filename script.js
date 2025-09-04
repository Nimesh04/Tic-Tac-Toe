// There is going to be three main things in here for the consol based on: gameBoard, player, game
// gameBoard is responsible for creating the actual board for the game.
// player is responsible for creating the players, giving them functionality like: being able to drop their tokens.
// game is responsible for playing the game, displaying the updates on the board, change the players, see if someone's already won it, lost it or tied it.



// Create a 3*3 grid for the board.

const gameBoard = (function (){
    const row = 3;
    const column = 3;
    let board = [];

    const newBoard = function(){
        for(let i = 0; i < row; i++){
            board[i] = [];
            for(let j = 0; j< column; j++){
                board[i].push(Cell());
            }
        }
    }

    newBoard();

    const getBoard = () => {return board;}
    const resetBoard = () => {
        board = [];
        newBoard();
    }


    const accessBoard = (x, y) => {
        return board[x][y];
    }

    const printBoard = () => board.map((row) => row.map(cell => cell.getValue())); // prints the value of each cell and only needed for the console version.

    return {printBoard, getBoard, accessBoard, resetBoard};
})();


// this is in order to get a clear picture of which player value is occupying the cell.
// we're going to have values as 0 for empty cells, X for player 1 and O for player 2.

function Cell(){
    let value = 0;

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return{ addToken, getValue};
}

function Player(){

    // since their would always be two players and we are predefining what each players value would be.
    const player = [
        {
            name : "playerOne",
            value: "X"
        },
        {
            name: "playerTwo",
            value: "O"
        }
    ]

    const getToken = (currentPlayer)=>{
        return currentPlayer.value;
    }

    const getPlayer = () =>{
        return player;
    }

    return {getPlayer, getToken};

}

/*
Game should be able to manage the currentPlayer, it should allow you to drop the value of the current player in the cell which they want
to drop it and should reflect the changes in the board in the console.
*/

function game(){
    let win, lose, tie;
    let countMoves = 0;
    let remainingCells = 9;
    const user = Player();
    let currentPlayer = user.getPlayer()[0];

    const board = gameBoard;
    const access_board = board.getBoard();
    board.printBoard();
    board.resetBoard();

 // this is to check if we've lost or not
    const gameWin = ()=>{
        let columnChecker = [];
        let rowChecker = [];
        let diagonalChecker = [];
        let movesCounter = '';
        for(let i = 0; i<3; i++){
            for(let j = 0; j<3; j++){
                movesCounter += board.getBoard()[i][j].getValue();
            }
            columnChecker.push(movesCounter);
            movesCounter = '';
        }

        for(let i = 0; i<3; i++){
            for(let j = 0; j<3; j++){
                movesCounter += board.getBoard()[j][i].getValue();
            }
            rowChecker.push(movesCounter);
            movesCounter = '';
        }

        for(let i = 0; i< 3; i++){
            movesCounter += board.getBoard()[i][i].getValue();
        }
        diagonalChecker.push(movesCounter);
        movesCounter = '';  
        let lastIndex = 3;
        for(let i =0; i< 3; i++){
            movesCounter += board.getBoard()[i][lastIndex -1].getValue();
            lastIndex -=1;
        }
        diagonalChecker.push(movesCounter);
        movesCounter = '';

        if((columnChecker.includes("XXX") || 
        rowChecker.includes("XXX") || 
        diagonalChecker.includes("XXX"))){
            console.log("Player won!");
            return win = true;
        }else if(columnChecker.includes("OOO")|| rowChecker.includes("OOO")|| diagonalChecker.includes("OOO")){
            console.log("Computer won");
            return lose = true;
        }else{
            return gameTied();
        }
    }

    // check if the game is tied
    const gameTied = ()=>{
        if(remainingCells == 0 && (!win || !lose)) return tie = true; 
    }
    
    //function to reset the game when a button is clicked {{ for later when DOM is implemented }}
    const resetGame = ()=>{
        return board.resetBoard();
    }
    const computerTurn = ()=>{
        let x = Math.floor(Math.random() *3);
        let y = Math.floor(Math.random() *3);
        console.log("Player two choose: ", x, y);
        changeCurrentPlayer();
        changeValue(x, y);
    }
    // function that changes who the current player is
    const changeCurrentPlayer = ()=>{
        if(currentPlayer.name == "playerOne") return currentPlayer = user.getPlayer()[1];
        else if(currentPlayer.name == "playerTwo"){
            return currentPlayer = user.getPlayer()[0];  
        }
    }
    // function which would allow the player to change access the specific cell, which would be the accessCell function from gameBoard,
    // where once accessed we can call the dropToken function from the player to change the value of that cell.

    const changeValue = (x, y) =>{
        if(remainingCells == 0) return gameTied();// if there is win, lose or tie, the game is over;

        let marker = board.accessBoard(x, y);
        if(marker.getValue() != 0){
            if(currentPlayer.name == "playerTwo") {     // if the computer pick an option which already has value, we randomize the choice again and do it
                let x = Math.floor(Math.random() *3);
                let y = Math.floor(Math.random() *3);
                console.log("Value present so Player two choose: ", x, y);
                changeValue(x, y);
            }
            else return "value present"; // this doesn't allow you to override any cell if there is already value present
        }else{
            marker.addToken(user.getToken(currentPlayer));
            countMoves++;
            // we know that there has to be at least 4 moves before we can check if there someone has won or not.
            if(countMoves >= 4){
                let result = gameWin();
                console.log(result);
            }
            remainingCells--;     // we're decreasing the number of remaining cells with each change to help us find out how many empty cells we've till the game ends.
            if(currentPlayer.name == "playerOne") computerTurn();  //give the computer it's turn if we're player one if it was computer's turn just changes it to our player
            else changeCurrentPlayer();
        }
        console.log(board.printBoard());
    }
    return {access_board, board, changeValue, resetGame};
}

/*
So far we've made a simple tic tac toe game where, you've a separate gameBoard logic, player logic and game logic, all of them are encapsulated.

Things we can completed so far:
a. Creation of game board logic
b. player creation logic
c. Basic game logic
d. being able to drop the value of the current player(it doesn't automatically change) in a cell.
e. not letting a cell be overridden by another players value.
f. being able to reset and get a new board.
g. Logic to change player automatically after one player has made the move.
h. Logic to figure out the win, loss or tie situation.
i. Logic to figure out if the computer won or the player

Things to work on:

In order to check the win, lose, or tie situation we need to have something that will run once the values are changed and to make it more efficient we know that we don't need
to check until one of the player does at least 3 moves.
Once the third move is done we can start to check if there are any conditions or players that have won.

a. Integrate the screen controls so that you can play from browser.

*/


const displayController = (function (){
    let cellDiv = document.querySelectorAll(".cells");

    cellDiv.forEach(cell =>{
        cell.addEventListener("click", () => console.log("div is clicked"));
    })
})();


const game1 = game();
displayController;
console.log(game1.board.printBoard());
