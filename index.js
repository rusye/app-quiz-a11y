'use strict';

// This sets the initial value for status bar
let questionNumber = 0;
let score = 0;

// This function inserts the score and question number
function scoreHeader() {
  $('.status').html(
    `<ul>
      <li class="question-number"></li>
      <li class="score"></li>
    </ul>`);
}
// This will handle the rendering of the question in DOM
function handleRenderQuestion() {

  if (questionNumber < STORE.length) {
    $('main').html(`
          <div class="question-page">
          <form id='form'>
            <fieldset>
            <legend><h2><span class="question">${STORE[questionNumber].question}</span></h2></legend>
              <ul>
              </ul>
            </fieldset>
            <button type="submit" class="submit-button">Submit</button>
          </form>
        </div>
      `);
    appendLabels();
  } else {
    $('.question-page').remove();
    $('.correctFeedback').remove();
    $('.status').toggle();
    handleResults();
  }
}

// This is a loop that will run through answers and spit them out as options
function appendLabels() {
  let answerOption = STORE[questionNumber];
  for (let i = 0; i < answerOption.answers.length; i++) {
    $('fieldset ul').append(
      `<li><label>
          <input class="answer-option" value="${answerOption.answers[i]}" type="radio" name="answer" required>
          <span>${answerOption.answers[i]}</span>
        </label></li>`)
  }
}

// This function will handle what happens when you hit the start button and what the form is going to look like
function handleStartQuiz() {
  $('.start-quiz').on('click', '.start-button', function (event) {
    $('.start-quiz').remove();
    scoreHeader();
    $('.score').text('Score: 0');
    $('.question-number').text('Question: 1/10');
    handleRenderQuestion();
  });
}

// This will handle what happens after the user has submitted his response to the question
function handleAnswerResponse() {
  $('main').on('submit', function (event) {
    event.preventDefault();
    let userAnswer = $('input:checked').val();
    $('.question-page').toggle();

    if (userAnswer === `${STORE[questionNumber].correctAnswer}`) {
      ifAnswerIsCorrect();
    } else {
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect() {
  $(`<div class="correctFeedback"><p>You got it <b>RIGHT!</b></p><button type=button class="nextButton">Next</button></div>`).appendTo('main');
  updateScore();
}

function updateScore() {
  score++;
  $('.score').text('Score: ' + score);
}

function ifAnswerIsWrong() {
  $(`<div class="correctFeedback"><p>You got it <b>WRONG!</b></p><p>The correct answer is <span>"${STORE[questionNumber].correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`).appendTo('main');
}

// This will handle loading up the next question
function handleNextQuestion() {
  $('main').on('click', '.nextButton', function (event) {
    $('.question-page').toggle();
    questionNumber++;
    updateQuestionNumber();
  })
}

function updateQuestionNumber() {
  $('.question-number').text('Question: ' + (questionNumber + 1 + '/10'));
  handleRenderQuestion();
}


// This will handle the reults on the last page
function handleResults() {
  $(`<div class="results-page"><p>You got ${score} out of 10 questions correct.</p><button class="restart-quiz" type="button">Restart</button></div>`).appendTo('main');
}

// This will restart the quiz
function handleQuizRestart() {
  $('main').on('click', '.restart-quiz', function (event) {
    questionNumber = 0;
    score = -1;
    $('.status').toggle();
    handleRenderQuestion();
    updateScore();
    updateQuestionNumber();
  })
}


function generateQuiz() {
  handleStartQuiz();
  handleAnswerResponse();
  handleNextQuestion();
  handleQuizRestart();
}

$(generateQuiz);