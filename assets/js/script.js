"use strict";

var viewHighScoresButtonEl = document.querySelector("#viewHighScoresButton");
var timeEl = document.querySelector("#timeRemaining");
var startButtonEl = document.querySelector("#startButton");
var introContainerEl = document.querySelector("#introContainer");
var secondsLeft;
var questions = [
    {
        question: "Commonly used data types DO NOT include:", 
        answers: ["strings", "booleans", "alerts", "numbers"], 
        correctAnswer: "alerts"
    },

    {
        question: "The condition in an if / else statement is enclosed within ________.", 
        answers: ["quotes", "curly brackets", "parentheses", "square brackets"], 
        correctAnswer: "parentheses"
    },

    {
        question: "Arrays in Javascript can be used to store ________.", 
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"], 
        correctAnswer: "all of the above"
    },

    {
        question: "String values must be enclosed within ________ when being assigned to variables.", 
        answers: ["commas", "curly brackets", "quotes", "parentheses"], 
        correctAnswer: "quotes"
    },

    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:", 
        answers: ["JavaScript", "terminal / bash", "for loops", "console.log"], 
        correctAnswer: "console.log"
    }
];
var currentQuestion = 0;

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