"use strict";

var viewHighScoresButtonEl = document.querySelector("#viewHighScoresButton");
var timeEl = document.querySelector("#timeRemaining");
var startButtonEl = document.querySelector("#startButton");
var introContainerEl = document.querySelector("#introContainer");
var questionsContainerEl = document.querySelector("#questionsContainer");
var h1El = document.querySelector("#questionHeader");
var listEl = document.querySelector("#answerList");
var li0 = document.querySelector("#list0");
var li1 = document.querySelector("#list1");
var li2 = document.querySelector("#list2");
var li3 = document.querySelector("#list3");
var formContainerEl = document.querySelector("#formContainer");
var highScoreFormEl = document.querySelector("#highScoreForm");
var secondsLeft;
var currentQuestion;

function setTimer() {
    secondsLeft = 76;
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft <= 0 ) {
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
        if (element.getAttribute("data-val") == questions[currentQuestion].correctAnswer) {
            // to do animate correct
        } else {
            secondsLeft > 10 ? secondsLeft -= 10 : secondsLeft = 0;
            // to do animate false
        }
        if (currentQuestion == 4) {
            // to do stop timer
            finalScore.textContent = secondsLeft;
            questionsContainerEl.setAttribute("class", "hide");
            formContainerEl.setAttribute("class", "show");
        } else {
            nextQuestion();
        }
    }
}

function nextQuestion() {
    currentQuestion += 1;
    h1El.textContent = questions[currentQuestion].question;
    li0.textContent = questions[currentQuestion].answers[0];
    li0.setAttribute("data-val", questions[currentQuestion].answers[0]);
    li1.textContent = questions[currentQuestion].answers[1];
    li1.setAttribute("data-val", questions[currentQuestion].answers[1]);
    li2.textContent = questions[currentQuestion].answers[2];
    li2.setAttribute("data-val", questions[currentQuestion].answers[2]);
    li3.textContent = questions[currentQuestion].answers[3];
    li3.setAttribute("data-val", questions[currentQuestion].answers[3]);
}

function startQuiz() {
    currentQuestion = -1;
    introContainerEl.setAttribute("class", "hide");
    setTimer();
    nextQuestion();
    questionsContainerEl.setAttribute("class", "show");
}

startButtonEl.addEventListener("click", startQuiz);
questionsContainerEl.addEventListener("click", checkAnswer);

