function startQuizAgain() {
  $("body").on("click", "#restart", (event) => {
    generateQuestion();
  });
}

function submitAnswer() {
  $("body").on("submit", "#js-questions", function (event) {
    event.preventDefault();
    let questionNumber = STORE.questions[STORE.questionNumber];
    let selectedOption = $("input[name=options]:checked").val();
    if (!selectedOption) {
      alert("Choose an option");
      return;
    }
    let id_num = questionNumber.options.findIndex((i) => i === selectedOption);
    let id = "#js-r" + ++id_num;
    $("span").removeClass("right-answer wrong-answer");
    if (selectedOption === questionNumber.answer) {
      STORE.score++;
      $(`${id}`).append(
        `You got it right<br/> The answer is "${questionNumber.answer}"<br/>`
      );
      $(`${id}`).addClass("right-answer");
    } else {
      $(`${id}`).append(
        `You got it wrong<br/> The answer is "${questionNumber.answer}"<br/>`
      );
      $(`${id}`).addClass("wrong-answer");
    }
    $(`${id}`).append(questionNumber.explanation);

    STORE.questionNumber++;
    $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
    $("#answer").hide();
    $("input[type=radio]").attr("disabled", true);
    $("#next-question").show();
  });
}

function getResultHtml() {
  return $(
    `<div class="results">
            <form id="js-restart-quiz">
            <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
            </div>
            <div>
            <button type="submit" id="restart">Restart Quiz</button>
            </div>`
  );
}

function displayResults() {
  let resultHtml = getResultHtml();

  STORE.questionNumber = 0;
  STORE.score = 0;
  $("#main-container").html(resultHtml);
}

function handleQuestions() {
  $("body").on("click", "#next-question", (event) => {
    STORE.questionNumber === STORE.questions.length
      ? displayResults()
      : generateQuestion();
  });
}

function updateQuestionAndScore() {
  const html = $(`<ul> <li id="js-answered">Question Number: ${
    STORE.questionNumber + 1
  }/${STORE.questions.length}
    </li>
    <li id="js-score">Score: ${STORE.score}/${STORE.questions.length}</li>
    </ul>`);
  $("#question-number-and-score").html(html);
}

function updateOptions() {
  let question = STORE.questions[STORE.questionNumber];
  for (let i = 0; i < question.options.length; i++) {
    $(".js-options").append(`<input type='radio' name='options' 
    id='options${i + 1}' value="${question.options[i]}" tabindex="${i + 1}">
    <label for="options${i + 1}"> ${question.options[i]}</label><br/>
    <span id="js-r${i + 1}"></span>`);
  }
}

function getQuestionHtml(question) {
  return $(`
    <div>
    <form id="js-questions">
    <h3>${question}</h3>
    <div class="js-options">
    </div>
    <button type="submit" id="answer">Submit</button>
    <button type="submit" id="next-question">Next</button>
  </form>
    </div>
`);
}

function generateQuestion() {
  updateQuestionAndScore();
  let questionObj = STORE.questions[STORE.questionNumber];
  const questionHtml = getQuestionHtml(questionObj.question);
  $("#main-container").html(questionHtml);
  updateOptions();
  $("#next-question").hide();
}

function startQuiz() {
  $("#start").on("click", function (event) {
    generateQuestion();
  });
}

function quizApp() {
  startQuiz();
  handleQuestions();
  submitAnswer();
  startQuizAgain();
}
$(quizApp);
