const buttonHeros = ["slark","cm","tuskar","weaver"];
let gamePattern = [];
let userClickedPattern = [];
const startButton = document.querySelector("#start")
const levelDisplay =document.querySelector("#score-title")
const replayButton = document.querySelector("#replay")

let level = 0 ;
let started = false;
const startGame = ()=>{
    if(!started){
        levelDisplay.innerText = "Level    " + level;
        nextSequence();
        started=true;

    }
    
}
startButton.addEventListener("click",startGame)


const playSound = (name)=>{
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


// $(".btns").click(function(){
//     let userChosenHero = $(this).attr("id");
//     userClickedPattern.push(userChosenHero);
//     console.log(userClickedPattern)
//     playSound(userChosenHero);
    
// });
const userClicked = (event)=>{
    // event.preventDefault();
    let userChosenHero = event.target.id;
    console.log(userChosenHero)
    userClickedPattern.push(userChosenHero); 
    console.log(userClickedPattern)
    playSound(userChosenHero)
    animatePress(userChosenHero)
    //Call checkAnswer() after a user has clicked and chosen their answer,
    //  passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1)
}
document.querySelector(".container").addEventListener("click",userClicked)




const checkAnswer = (currentLevel) =>{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }else{
        console.log('wrong')
        playSound("jugg")

        levelDisplay.innerText = "Game Over , Press Replay Button "
        document.querySelector("body").classList.add("game-over");
        
        startOver();
    }

}




const nextSequence = () =>{

    userClickedPattern=[];

    level++;


    levelDisplay.innerText = "Level    " + level;
    

  
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenHero = buttonHeros[randomNumber];
    
    gamePattern.push(randomChosenHero);
    
    $("#"+randomChosenHero).fadeIn(100).fadeOut(100).fadeIn(100);
    // document.querySelector("#"+randomChosenHero)
    
    playSound(randomChosenHero);
    
}
// nextSequence();






const animatePress = (currentHero) =>{
    console.log(document.querySelector("#"+currentHero))
    document.querySelector("#"+currentHero).classList.add("pressed");

    setTimeout(() => {
        document.querySelector("#"+currentHero).classList.remove("pressed")
    }, 100);
}

const startOver = () =>{
  level = 0;
  gamePattern = [];
  started = false;
}

replayButton.addEventListener("click", startOver)
    

    




