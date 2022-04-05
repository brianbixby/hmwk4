"use strict";

var viewHighScoresButtonEl = document.querySelector("#viewHighScoresButton");
var timeEl = document.querySelector("#timeRemaining");
var startButtonEl = document.querySelector("#startButton");
var introContainerEl = document.querySelector("#introContainer");
var secondsLeft;
var currentQuestion = 0;

console.log("questions: ", questions);

function setTimer() {
    console.log("setTimer");
    secondsLeft = 76;
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            // Calls function to create and append image
            //   sendMessage();
        }

    }, 1000);
}

function nextQuestion() {

}

function startQuiz() {
    console.log("startQuiz");
    introContainerEl.setAttribute("class", "hide");
    setTimer();
    nextQuestion();
}

startButtonEl.addEventListener("click", startQuiz);

// var questions [{ question: "q1", answers: ["a1", "a2"], correctAnswer: 1}];
// var currentQuestion = 0;



// function init(event) {
//     // .textContent set questions and ansers 
// }

// function validate(event) {
//     // checks if answer is answer is correctAnswer
//     console.log(event.target);
//     // do logic to see if right answer 
//     // update score

//     // at the end after that
//     generateNextQuestion();
// }

// function generateNextQuestion() {
//     currentQuestion += 1;
//     // .textContent set questions and ansers 
// }

// // submit answer button
// var submitButton = document.querySelector("#submitButton");
// submitButton.addEventListener("click", validate);
// // startgame
// var myButton = document.querySelector("#myButton");

// myButton.addEventListener("click", init);