let inputDir={ x:0,y:0};
let score=0;
let maxScore=0;
const foodSound =  new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new  Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let lastpainttime=0;
let speed=3;
let snakeArr  =[{x:12 , y:15}];
food={x:13,y:15};
let scoreVal=document.querySelector("#score");
let maxScoreVal =document.querySelector(".maxscore");


function main(ctime){
    window.requestAnimationFrame(main);
    console.log(ctime);
    if((ctime-lastpainttime)/1000< 1/speed)
    {return;}
    lastpainttime=ctime;
    gameEngine();

   
}
function isCollide(sarr){
    //if you bump into yourself
    for(let i=1;i<sarr.length;i++)
    {
        if(sarr[i].x===sarr[0].x && sarr[i].y===sarr[0].y)
        {
            return true;
        }
    }
    if(sarr[0].x>=18 || sarr[0].x<=0 ||sarr[0].y>=18 || sarr[0].y<=0){
        return true;
    }
    
    scoreVal.innerHTML=`Score: ${score}`;
    maxScoreVal.innerHTML=` Max : ${maxScore}`;
}
function gameEngine()

{
      musicSound.play();
    //Updating snake array and food
    if(isCollide(snakeArr))
        {
            gameOverSound.play();
            musicSound.pause();
            inputDir={ x:0,y:0};

            alert(`Game over :( .Your score was ${score}`);
            snakeArr  =[{x:12 , y:15}];
            musicSound.play();
            score=0;
    
    
        }
   
    //if eaten food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
    {
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        foodSound.play();
        score = score+1;
        maxScore= Math.max(maxScore,score);

        food={x:Math.round(a+(b-a)*Math.random()) ,y:Math.round(a+(b-a)*Math.random())};
    }
    //Moving snake
    for(let i=snakeArr.length-2;i>=0;i--)
    {
              const element=snakeArr[i];
              snakeArr[i+1]={...snakeArr[i]};
              moveSound.play();
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    //Display snake 
    board.innerHTML ="";
    snakeArr.forEach((e,index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    
    if(index===0)
    {
        snakeElement.classList.add('head');
    }
    else{
        snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);

    })
    //display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

    

}





window.requestAnimationFrame(main);
window.addEventListener("keydown",(e)=>{
    inputDir={x:0,y:1};
    moveSound.play();
    switch(e.key)
    {
        case "ArrowUp":
            console.log("arrow up");
            inputDir.x=0;
            inputDir.y=-1;

            break;
            case "ArrowDown":
                console.log("arrow down");
                console.log("arrow up");
                inputDir.x=0;
                inputDir.y=1;
    
                break;
                case "ArrowLeft":
                    console.log("arrow left");
                    console.log("arrow up");
                    inputDir.x=-1;
                    inputDir.y=0;
        
                    break;
                    case "ArrowRight":
                        console.log("arrow right");
                        console.log("arrow up");
                        inputDir.x=1;
                        inputDir.y=0;
            
                        break;
                        default:
                            break;


    }

})