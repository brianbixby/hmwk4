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
var scoresContainerEl = document.querySelector("#scoresContainer");
var scoreFormEl = document.querySelector("#scoreForm");
var clearButtonEl = document.querySelector("#clearButton");
var backButtonEl = document.querySelector("#backButton");
var secondsLeft;
var currentQuestion;
var timerInterval;

function goToLandingPage() {
    formContainerEl.setAttribute("class", "hide");
    questionsContainerEl.setAttribute("class", "hide");
    scoresContainerEl.setAttribute("class", "hide");
    introContainerEl.setAttribute("class", "show");
}

function clearHighScores() {
    document.querySelector("#highscoresList").innerHTML = "";
    localStorage.removeItem("highScores");
}

function showHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores"));
    var highscoresListEl = document.querySelector("#highscoresList");
    highscoresListEl.innerHTML = "";

    formContainerEl.setAttribute("class", "hide");
    questionsContainerEl.setAttribute("class", "hide");
    introContainerEl.setAttribute("class", "hide");
    scoresContainerEl.setAttribute("class", "show");
    for (let i = 0; i < highScores.length; i++) {
        var li = document.createElement("li");
        li.textContent = `${highScores[i].name} - ${highScores[i].score}`;
        highscoresListEl.appendChild(li);
    }
}

function handleScoreFormSubmit(event) {
    event.preventDefault();
    var initials = document.querySelector("#initialsInput").value.trim();
    if (initials.length) {
        var highScores = JSON.parse(localStorage.getItem("highScores"));
        if (highScores) {
            highScores.push({ "name": initials, "score": Number(secondsLeft) });
            highScores.sort((a, b) => b.score - a.score);
        } else {
            highScores = [{ "name": initials, "score": Number(secondsLeft) }];
        }
        localStorage.setItem("highScores", JSON.stringify(highScores));
        showHighScores()
        // to do remove displayed error neeed length
    } else {
        // to do display error neeed length
    }
}

function setTimer() {
    secondsLeft = 76;
    timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            finalScore.textContent = secondsLeft;
            questionsContainerEl.setAttribute("class", "hide");
            formContainerEl.setAttribute("class", "show");
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
            clearInterval(timerInterval);
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
scoreFormEl.addEventListener("submit", handleScoreFormSubmit);
clearButtonEl.addEventListener("click", clearHighScores);
backButtonEl.addEventListener("click", goToLandingPage);
viewHighScoresButtonEl.addEventListener("click", showHighScores);
