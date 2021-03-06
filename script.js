const buttonHeros = ["slark","cm","tuskar","weaver"];

const startButton = document.querySelector("#start")
const levelDisplay =document.querySelector("#score-title")
const replayButton = document.querySelector("#replay")
const heroButtons = document.querySelectorAll(".btns")
const extraSound = document.querySelector("#extra")
const high = document.querySelector("#high")
const musicBtn = document.querySelector("#musicBtn")
const musicOff= document.querySelector("#musicOff")
let gamePattern = [];
let userClickedPattern = [];

let highestLevel = 0;
let level = 0 ;
let started = false;
const play = ()=>{
    const audio = document.querySelector("audio");
    audio.play();
}
musicBtn.addEventListener("click",play)

const pause = ()=>{
    const audio = document.querySelector("audio");
    audio.pause();
}
musicOff.addEventListener("click",pause)
const startGame = ()=>{
        levelDisplay.innerText = "Level    " + level;
        musicBtn.disabled=true;
        pause();
        nextSequence();
}
startButton.addEventListener("click",startGame)
  
const playSound = (name)=>{
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

const userClicked = (event)=>{
    event.preventDefault();
    let userChosenHero = event.target.id;
    userClickedPattern.push(userChosenHero);
    
    if(userClickedPattern.length>highestLevel){
        highestLevel = userClickedPattern.length ;

    }
    playSound(userChosenHero)
    animatePress(userChosenHero)
    //Call checkAnswer() after a user has clicked and chosen their answer,
    //  passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1)
}
document.querySelector(".container").addEventListener("click",userClicked)

const checkAnswer = (currentLevel) =>{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }else{
        setTimeout(() => {
            playSound("jugg")
        }, 1000);
        
        levelDisplay.innerText = "Game Over , Press Replay Button "
        document.querySelector("body").classList.add("game-over");
        startButton.disabled = true;
        heroButtons.forEach(element => {
            element.disabled = true;
        }); 
    }   
}

const nextSequence = () =>{
    userClickedPattern=[];
    level++;
    levelDisplay.innerText = "Level    " + level;
    if(level>highestLevel){
        high.innerText=level;
        }
        
    
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenHero = buttonHeros[randomNumber];
    
    gamePattern.push(randomChosenHero);
    
    $("#"+randomChosenHero).fadeIn(100).fadeOut(100).fadeIn(100);
    startButton.disabled = true;

    playSound(randomChosenHero);
    fiveScore();
    tenScore();
}

const fiveScore = () =>{
    if(level === 5){
        setTimeout(() => {
            playSound("dominating")
        }, 1000);
        
        extraSound.innerText="DOMINATING"
        setTimeout(() => {
            extraSound.innerText="" 
        }, 5000);
        
    }
}

const tenScore = () =>{
    if(level === 10){
        setTimeout(() => {
            playSound("godlike") 
        }, 1000);
        extraSound.innerText="GOD LIKE"
        setTimeout(() => {
            extraSound.innerText=""
        },5000);
    }
}


const animatePress = (x) =>{
    document.querySelector("#"+x).classList.add("pressed");
    setTimeout(() => {
        document.querySelector("#"+x).classList.remove("pressed")
    }, 100);
}


const startOver = () =>{

  level = 0;
  gamePattern = [];
  document.querySelector("body").classList.remove("game-over");
  startButton.disabled = false;
  heroButtons.forEach(element => {
    element.disabled = false;
    musicBtn.disabled=false;
});
  levelDisplay.innerText = ""
}

replayButton.addEventListener("click", startOver)
startOver();