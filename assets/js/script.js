"use strict";

var viewHighScoresButtonEl = document.querySelector("#viewHighScoresButton");
var timeEl = document.querySelector("#timeRemaining");
var startButtonEl = document.querySelector("#startButton");
var introContainerEl = document.querySelector("#introContainer");
var questionsContinerEl = document.querySelector("#questionsContiner");
var secondsLeft;
var currentQuestion = -1;

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

function checkAnswer(event) {
    var element = event.target;

    if (element.matches("li")) {
        var val = element.getAttribute("data-val");
        if (val === questions[currentQuestion].correctAnswer) {
            console.log("correct");
            // to do animate correct

        } else {
            console.log("false");
            secondsLeft > 10 ? secondsLeft -= 10 : secondsLeft = 0;
            // to do animate false
        }
        nextQuestion();
    }
}

function nextQuestion() {
    currentQuestion += 1;
    var h1El = document.createElement("h1");
    var listEl = document.createElement("ol");
    var li0 = document.createElement("li");
    var li1 = document.createElement("li");
    var li2 = document.createElement("li");
    var li3 = document.createElement("li");
    h1El.textContent = questions[currentQuestion].question;
    li0.textContent = questions[currentQuestion].answers[0];
    li0.setAttribute("data-val", questions[currentQuestion].answers[0]);

    li1.textContent = questions[currentQuestion].answers[1];
    li1.setAttribute("data-val", questions[currentQuestion].answers[1]);

    li2.textContent = questions[currentQuestion].answers[2];
    li2.setAttribute("data-val", questions[currentQuestion].answers[2]);

    li3.textContent = questions[currentQuestion].answers[3];
    li3.setAttribute("data-val", questions[currentQuestion].answers[3]);

    listEl.appendChild(li0);
    listEl.appendChild(li1);
    listEl.appendChild(li2);
    listEl.appendChild(li3);
    questionsContinerEl.appendChild(h1El);
    questionsContinerEl.appendChild(listEl);
}

function startQuiz() {
    console.log("startQuiz");
    introContainerEl.setAttribute("class", "hide");
    setTimer();
    nextQuestion();
}

startButtonEl.addEventListener("click", startQuiz);
questionsContinerEl.addEventListener("click", checkAnswer);

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