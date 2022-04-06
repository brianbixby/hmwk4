"use strict";

var viewHighScoresButtonEl = document.querySelector("#viewHighScoresButton");
var timeEl = document.querySelector("#timeRemaining");
var startButtonEl = document.querySelector("#startButton");
var introContainerEl = document.querySelector("#introContainer");
var questionsContainerEl = document.querySelector("#questionsContainer");
var h1El = document.querySelector("#questionHeader");
var listEl = document.querySelector("#answerList");
var liButton0 = document.querySelector("#listButton0");
var liButton1 = document.querySelector("#listButton1");
var liButton2 = document.querySelector("#listButton2");
var liButton3 = document.querySelector("#listButton3");
var formContainerEl = document.querySelector("#formContainer");
var scoresContainerEl = document.querySelector("#scoresContainer");
var scoreFormEl = document.querySelector("#scoreForm");
var clearButtonEl = document.querySelector("#clearButton");
var backButtonEl = document.querySelector("#backButton");
var headerEl = document.querySelector("header");
var lastQuestionResultEl = document.querySelector("#lastQuestionResult");
var secondsLeft;
var currentQuestion;
var timerInterval;
var showlastQuestionResultFlag;

function handleFormContainerClick() {
    if (showlastQuestionResultFlag) {
        lastQuestionResultEl.setAttribute("class", "hide");
        showlastQuestionResultFlag = false;
    }
}
function goToLandingPage() {
    timeEl.textContent = 0;
    formContainerEl.setAttribute("class", "hide");
    questionsContainerEl.setAttribute("class", "hide");
    scoresContainerEl.setAttribute("class", "hide");
    lastQuestionResultEl.setAttribute("class", "hide");
    headerEl.setAttribute("class", "show");
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
    headerEl.setAttribute("class", "hide");
    lastQuestionResultEl.setAttribute("class", "hide");
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
            // to do if time runs out hide all right stuff
        }
    }, 1000);
}

function checkAnswer(event) {
    var element = event.target;

    if (showlastQuestionResultFlag) {
        lastQuestionResultEl.setAttribute("class", "hide");
        showlastQuestionResultFlag = false;
    } else if (element.matches("button")) {
        if (element.getAttribute("data-val") == questions[currentQuestion].correctAnswer) {
            lastQuestionResultEl.textContent = "Correct!";
            // to do animate correct
        } else {
            secondsLeft > 10 ? secondsLeft -= 10 : secondsLeft = 0;
            timeEl.textContent = secondsLeft;
            lastQuestionResultEl.textContent = "Wrong!";
            // to do animate false
        }
        if (currentQuestion == 4) {
            clearInterval(timerInterval);
            finalScore.textContent = secondsLeft;
            questionsContainerEl.setAttribute("class", "hide");
            formContainerEl.setAttribute("class", "show");
            lastQuestionResultEl.setAttribute("class", "show");
            showlastQuestionResultFlag = true;
        } else {
            nextQuestion();
        }
    }
}

function nextQuestion() {
    currentQuestion += 1;
    h1El.textContent = questions[currentQuestion].question;
    liButton0.textContent = `1. ${questions[currentQuestion].answers[0]}`;
    liButton0.setAttribute("data-val", questions[currentQuestion].answers[0]);
    liButton1.textContent = `2. ${questions[currentQuestion].answers[1]}`;
    liButton1.setAttribute("data-val", questions[currentQuestion].answers[1]);
    liButton2.textContent = `3. ${questions[currentQuestion].answers[2]}`;
    liButton2.setAttribute("data-val", questions[currentQuestion].answers[2]);
    liButton3.textContent = `4. ${questions[currentQuestion].answers[3]}`;
    liButton3.setAttribute("data-val", questions[currentQuestion].answers[3]);
    if (currentQuestion >= 1) {
        lastQuestionResultEl.setAttribute("class", "show");
        showlastQuestionResultFlag = true;
    }
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
formContainerEl.addEventListener("click", handleFormContainerClick);
