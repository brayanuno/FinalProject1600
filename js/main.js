 // Init Scrollspy
 $('body').scrollspy({ target: '#main-nav' });

 // Smooth Scrolling
 $("#main-nav a").on('click', function (event) {
   if (this.hash !== "") {
     event.preventDefault();

     const hash = this.hash;

     $('html, body').animate({
       scrollTop: $(hash).offset().top
     }, 800, function () {

       window.location.hash = hash;
     });
   }
 });

// Word Game Start
window.addEventListener('load', init);
//importing array from randomWords File
import {words} from './randomWords.js';
//level Info

// Constructor to set the level info
function Level(name, difficulty, seconds) {
    this.name = name;
    this.difficulty = difficulty;
    this.seconds = seconds;
  }
//changing the levels
const firstLevel =  new Level("Nub", "Beginner",6);
const secondLevel =  new Level("Pro", "Intermediate",4);
let thirdLevel =  new Level("God", "Expert",3);

// setting variables for levels
let currentLevel = 6; //default seconds
let seconds = document.querySelector('#seconds');
let levelName = document.querySelector('#levelName');
let expert = document.querySelector('#expert');
let difficulty = document.querySelector('#difficulty');

expert.addEventListener('click', function() {
    currentLevel = thirdLevel.seconds;
    seconds.innerHTML = thirdLevel.seconds;
    levelName.innerHTML = thirdLevel.name;
    difficulty.innerHTML = thirdLevel.difficulty;
    startMatch();
});

intermediate.addEventListener('click', function() {
    currentLevel = secondLevel.seconds;
    seconds.innerHTML = secondLevel.seconds;
    levelName.innerHTML = secondLevel.name;
    difficulty.innerHTML = secondLevel.difficulty;
    startMatch();
});

beginner.addEventListener('click', function() {
    currentLevel = firstLevel.seconds;
    seconds.innerHTML = firstLevel.seconds;
    levelName.innerHTML = firstLevel.name;
    difficulty.innerHTML = firstLevel.difficulty;
    startMatch();
});

//Global Variables
let score = 0;
let time = currentLevel;
let playing;
//Global const Variables
const wordUpdate = document.querySelector('#wordUpdate');
const inputWord = document.querySelector('#inputWord');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#screenMessage');

// Initialize Game
function init() {
    //cdisplaying random words
    wordDisplaying(words);
    //checking if word match the random word
    inputWord.addEventListener('input',startMatch);
    //calling the countdown
    setInterval(countdown, 1000);
    //game status
    setInterval(checkStatus,50);
}

//starting a new match
const startMatch = () => {
    if(matchWords()) {
        playing = true;
        time = currentLevel + 1;
        wordDisplaying(words);
        inputWord.value = '';
        score++;
    }
    if(score === -1) {
        scoreDisplay.InnerHTML = 0;
    }else {
        scoreDisplay.innerHTML = score;
    }
}

//matching the two word current and input
const matchWords = () => {
    if(inputWord.value === wordUpdate.innerHTML) {
        message.innerHTML = "Excelent , Nice Job";
        return true;
    }else {
        message.innerHTML = '';
        return false;
    }
}
//displaying a random word when page refresh
const wordDisplaying = (words) => {
    //generating random indexes 
    const randomIndex = Math.floor(Math.random() * words.length)
    wordUpdate.innerHTML = words[randomIndex];

}
// Setting a timer
const countdown = () => {
    if(time > 0) {
        time--;
    }
    else if (time === 0){
        playing = false;
    }
    timeDisplay.innerHTML =  time;
}
//checking if game is over or not
const checkStatus = () => {
    if (playing && time === 0) {
        message.innerHTML = 'Game over,Try Again';
        score = -1;
    }
}
