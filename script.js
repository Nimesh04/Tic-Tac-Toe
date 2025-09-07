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



    const accessBoard = (x, y) => {
        return board[x][y];
    }

    const printBoard = () => board.map((row) => row.map(cell => cell.getValue())); // prints the value of each cell and only needed for the console version.

    const resetBoard = () => {
        board = [];
        newBoard();
    }

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
    let result = '';
    let countMoves = 0;
    let remainingCells = 9;
    const user = Player();
    let currentPlayer = user.getPlayer()[0];

    const board = gameBoard;
    board.resetBoard();


    const getResult = () =>{ return result;}
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

        if((columnChecker.includes("XXX") || rowChecker.includes("XXX") || diagonalChecker.includes("XXX"))){
            win = true;
            return;
        }else if(columnChecker.includes("OOO")|| rowChecker.includes("OOO")|| diagonalChecker.includes("OOO")){
            lose = true;    
            return;
        }
        // else{
        //     tie = true;
        //     return;
        // }
    }
    
    //function to reset the game when a button is clicked {{ for later when DOM is implemented }}
    const resetGame = ()=>{
        result = '';
        win, lose, tie = false;
        return board.resetBoard();
    }
    // const computerTurn = ()=>{
    //     let x = Math.floor(Math.random() *3);
    //     let y = Math.floor(Math.random() *3);
    //     console.log("Player two choose: ", x, y);
    //     changeCurrentPlayer();
    //     changeValue(x, y);
    // }
    // function that changes who the current player is
    const changeCurrentPlayer = ()=>{
        if(currentPlayer.name == "playerOne") return currentPlayer = user.getPlayer()[1];
        else if(currentPlayer.name == "playerTwo") return currentPlayer = user.getPlayer()[0];  
    }
    // function which would allow the player to change access the specific cell, which would be the accessCell function from gameBoard,
    // where once accessed we can call the dropToken function from the player to change the value of that cell.

    const changeValue = (div, x, y) =>{
        let marker = board.accessBoard(x, y);

        //removing the computer right now so that it would be 2 human players vs each other
        if(marker.getValue() != 0){
            return "value present";
            // if(currentPlayer.name == "playerTwo") {     // if the computer pick an option which already has value, we randomize the choice again and do it
            //     let x = Math.floor(Math.random() *3);
            //     let y = Math.floor(Math.random() *3);
            //     console.log("Value present so Player two choose: ", x, y);
            //     changeValue(x, y);
            // }
            // else return "value present"; // this doesn't allow you to override any cell if there is already value present
        }else{
            marker.addToken(user.getToken(currentPlayer));
            countMoves++;
            if(currentPlayer.name == "playerOne") {
                div.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" fill= "#ff57f5" viewBox="0 0 24 24"><title>close-thick</title><path d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12L20 6.91Z" /></svg>';
                changeCurrentPlayer();
                // computerTurn();
            }  //give the computer it's turn if we're player one if it was computer's turn just changes it to our player
            else {
                div.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" fill="#94ffa4" viewBox="0 0 24 24"><title>circle-outline</title><path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>';
                changeCurrentPlayer();
            }
            // we know that there has to be at least 4 moves before we can check if there someone has won or not.
            if(countMoves >= 4){
                gameWin();
                if(win === true){
                    result = "Player X won!";
                    return;
                }else if(lose === true){
                    result = "Player O won!";
                    return;
                }else if(tie === true){
                    result = "Game Tied";
                    return;
                }
            }
            remainingCells--;     // we're decreasing the number of remaining cells with each change to help us find out how many empty cells we've till the game ends.
        
        
        }  
        if((remainingCells == 0) && (!win || !lose)) {
            tie = true;
            result = "Game Tied";
            return;
        }  
    }
  
    return {getResult, changeValue, resetGame};
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
    let playerX = document.querySelector(".human >h3");
    let playerY = document.querySelector(".computer >h3");
    let cellDiv = document.querySelectorAll(".cells");
    let resultDiv = document.querySelector(".display");
    let startBtn = document.querySelector("#start");
    let restartBtn = document.querySelector("#restart");

    let player1 = 0;
    let player2 = 0 ;
    let game1 = game();

    startBtn.addEventListener("click", () =>{

        player1 = 0;
        player2 = 0;
        playerX.textContent = `Player X: ${player1}`;
        playerY.textContent = `Player O: ${player2}`;
        game1 = game();
        cellDiv.forEach(cell =>{
            cell.style.pointerEvents = "auto";
            cell.innerHTML = '';
        })
        resultDiv.innerHTML = "Player X turn";
        setTimeout(() =>{resultDiv.innerHTML = ""}, 1000);
        event.preventDefault();
    })
    const checkData = function (cell){
        const value = cell.dataset.value;
        switch (value){
            case "0":
                game1.changeValue(cell,0,0);
                break;
            case "1":
                game1.changeValue(cell, 0,1);
                break;
            case "2":
                game1.changeValue(cell, 0, 2);
                break;
            case "3":
                game1.changeValue(cell, 1,0);
                break;
            case "4":
                game1.changeValue(cell,1,1);
                break;
            case "5":
                game1.changeValue(cell, 1,2);
                break;
            case "6":
                game1.changeValue(cell, 2,0);
                break;
            case "7":
                game1.changeValue(cell, 2,1);
                break;
            case "8":
                game1.changeValue(cell, 2,2);
                break;
        }
        
        if(game1.getResult()){
            resultDiv.innerHTML = game1.getResult();
            restartBtn.style.display = "block";
            if(game1.getResult() == "Player X won!"){
                player1++;
                playerX.textContent = `Player X: ${player1}`;
            }else if(game1.getResult() =="Player O won!"){
                player2++;
                playerY.textContent = `Player O: ${player2}`;
            }
            //makes the rest of the div un=clickable
            cellDiv.forEach(cell =>{
                cell.style.pointerEvents = "none";
            })

            event.preventDefault();
        }
    }

    restartBtn.addEventListener("click", ()=>{
        game1 = game();
        cellDiv.forEach(cell =>{
            cell.innerHTML = '';
            cell.style.pointerEvents = "auto";
        })
        resultDiv.innerHTML = "";
        restartBtn.style.display = "none";
        event.preventDefault();
    })

    cellDiv.forEach(cell =>{
        cell.addEventListener("click", () => {
            checkData(cell);
        });
    })
})();

displayController;

