// There is going to be three main things in here for the consol based on: gameBoard, player, game
// gameBoard is responsible for creating the actual board for the game.
// player is responsible for creating the players, giving them functionality like: being able to drop their tokens.
// game is responsible for playing the game, displaying the updates on the board, change the players, see if someone's already won it, lost it or tied it.



// Create a 3*3 grid for the board.

function gameBoard(){
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


    const resetBoard = () => {
        board = [];
        newBoard();
    }


    const accessBoard = (x, y) => {
        return board[x][y];
    }

    const printBoard = () => board.map((row) => row.map(cell => cell.getValue())); // prints the value of each cell.

    return {printBoard, accessBoard, resetBoard};
}




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
    let user = Player();
    let currentPlayer = user.getPlayer()[0];

    let board1 = gameBoard();
    board1.printBoard();
    board1.resetBoard();

    
    // function which would allow the player to change access the specific cell, which would be the accessCell function from gameBoard,
    // where once accessed we can call the dropToken function from the player to change the value of that cell.

    let changeValue = (x, y) =>{

        let marker = board1.accessBoard(x, y);
        if(marker.getValue() != 0) return "value present"; // this doesn't allow you to override any cell if there is already value present

        marker.addToken(user.getToken(currentPlayer));
    }
    console.log(board1.printBoard());
    return {board1, changeValue};
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

Things to work on:
a. Logic to change player automatically after one player has made the move.
b. Logic to figure out the win, loss or tie situation.
c. Integrate the screen controls so that you can play from browser.

*/


let game1 = game();

game1.changeValue(1,2);
game1.changeValue(0,0);

console.log(game1.board1.printBoard());