const playboard= document.querySelector(".play_board");
const scoreElement = document.querySelector(".score");
const heightscoreElement = document.querySelector(".high_score");
let gameOver= false;
let foodX , foodY ;
let snakeX=5, snakeY=10;
let snakeBoby=[];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;
let heightScore = localStorage.getItem("high_score") || 0;
heightscoreElement.innerHTML = `High Score: ${heightScore}`;

const changFoodPosition=()=>{
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;  
}
const handleGameOver= ()=> {
    clearInterval(setIntervalId);
    alert("Nooo !!! GAME OVER");
    location.reload();
}
const changeDirection= (e)=>{
    if(e.key === "ArrowUp"){
        velocityX=-1;
        velocityY=0; 
    }else if(e.key === "ArrowDown"){ 
        velocityX =1;
        velocityY=0;
    }else if(e.key === "ArrowLeft"){ 
        velocityX =0;
        velocityY=-1;
    }else if(e.key === "ArrowRight"){ 
        velocityX =0;
        velocityY=1;
    }

 }

const initGame= ()=>{
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
     if(snakeX ===foodY && snakeY ===   foodX){
        changFoodPosition();
        snakeBoby.push([foodX,foodY]);
        score++;
        heightScore = score >= heightScore ? score: heightScore;
        localStorage.setItem("high_score", heightScore);
        scoreElement.innerHTML = `score: ${score}`;
        heightscoreElement.innerHTML = `High Score: ${heightScore}`;
         }
     
     
    snakeX += velocityX;
     snakeY += velocityY
     
     if(snakeX<= 0 || snakeX >30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
     }
        htmlMarkup += `<div class="head" style="grid-area: ${snakeX} / ${snakeY}"></div>`;

    playboard.innerHTML = htmlMarkup;

}

changFoodPosition();
 setIntervalId= setInterval(initGame, 125);
 document.addEventListener("keydown", changeDirection);










