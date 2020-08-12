/**
 * Implementation of TicTacToe in Js!
 * Simple board game in which two players compete to get 3 cells in a row.
 * @pablooaliaga
 */


let no_player = 0
let player1 = 'X';
let player2 = 'O';

let size = 3;
let width = 400;

let factor = width / size;
let offset = width / (size*2);
let margin = factor * 0.2;
let fixed_offset = offset - margin;

let board = [];
let options = [];
for(let i=0; i<size; i++){
    board[i] = new Array(size);
}

let winner;
let winner_cells;
let currentPlayer;
let playable_cells;

function reset(){
    //every cell to  
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++){
            board[i][j] = no_player;
        }        
    }
    playable_cells = size*size;
    winner = no_player;
    winner_cells = [];
    currentPlayer = player1; //harcoded value
}


function setup() 
{
    createCanvas(width,width);
    reset();
}

function checkAvailable(){
    return playable_cells > 0;
}

function checkWinner(){
    for (let i=0; i < size - 2; i++){
        for (let j=0; j < size - 2; j++){
            //assumes that there is a winner
            winner = currentPlayer;
            //horizontal winning
            if(board[i][j] == currentPlayer && board[i][j+1] == currentPlayer && board[i][j+2] == currentPlayer){
                winner_cells = [[i,j],[i,j+1],[i,j+2]];
            }
            //vertical winning 
            else if(board[i][j] == currentPlayer && board[i+1][j] == currentPlayer && board[i+2][j] == currentPlayer){
                winner_cells = [[i,j],[i+1,j],[i+2,j]];
            }
            //diagonal winning
            else if(board[i][j] == currentPlayer && board[i+1][j+1] == currentPlayer && board[i+2][j+2] == currentPlayer){
                winner_cells = [[i,j],[i+1,j+1],[i+2,j+2]];
            } else {
                winner = no_player
            }
        }    
    }
}

function mousePressed(){
    //we have mouseX and mouseY as values
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++){
            if(
                (mouseX > factor*(j) && mouseX < factor*(j+1)) && 
                (mouseY > factor*(i) && mouseY < factor*(i+1)) && 
                (board[i][j] == no_player)
                ){
                board[i][j] = currentPlayer;
                playable_cells--;
                checkWinner();
                nextTurn();
                return;
            }
        }        
    }

    
}


function nextTurn(){
    if (currentPlayer == player1){
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
}




function draw()
{
    background(220);
    strokeWeight(4);
    
    //draw board lines
    for (let i = 0; i <= size; i++) {
        line(factor*i, 0, factor*i, width); //vertical
        line(0, factor*i, width, factor*i); //horizontal
    }

    for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
            //draw here
            let spot = board[i][j];
            let x = factor*j + offset;
            let y = factor*i + offset;
            if (spot == player1) {
                //draw X
                line(x - fixed_offset,y - fixed_offset,x + fixed_offset,y + fixed_offset);
                line(x - fixed_offset,y + fixed_offset,x + fixed_offset,y - fixed_offset);
            } else if (spot == player2) {
                //draw O
                noFill();
                ellipse(x,y, factor - margin);
            }
        }
    }
    //winner case
    if(winner != no_player){
        noLoop();
        //mark winner cells
        for(let n=0; n<3; n++){
            let x = factor*winner_cells[n][1] + offset;
            let y = factor*winner_cells[n][0] + offset;
            line(x - fixed_offset, y, x + fixed_offset, y)
        }
        console.log("Winner is -> " + winner);

    }
    //tie case 
    else if(!checkAvailable()){
        noLoop();
        console.log("TIE!");
    }   


}