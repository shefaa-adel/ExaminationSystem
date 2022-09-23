var examArea = document.getElementById("examArea");
var questionsArr = [];
var questionValue = document.getElementById("questionValue");
var questionChoices = document.getElementById("questionChoices");
var questionNum = document.getElementById("questionNum");
var currentQuesNumber;
var nextBtn = document.getElementById("nextBtn");
var preBtn = document.getElementById("preBtn");
var solution = [];

//{quesId:
//selectedAns:}
var markBtn = document.getElementById("markBtn");
var markedDiv = document.getElementById("markedDiv");
var markedArr = [];
var showMarkedQues = [];
var deleteMarkedQues = [];
var resultArea = document.getElementById("resultArea");
var resultValue = document.getElementById("resultValue");
var submitBtn = document.getElementById("submitBtn");
var resultCounter = 0;

var quesOneAnswers = [
  new Answer(1, "A"),
  new Answer(2, "B"),
  new Answer(3, "BCPL"),
  new Answer(4, "C++"),
];

var quesOne = new Question(
  1,
  "Which of the following language is the predecessor to C Programming Language?",
  3,
  quesOneAnswers
);
questionsArr.push(quesOne);

var quesTwoAnswers = [
  new Answer(1, "High Level"),
  new Answer(2, "Low Level"),
  new Answer(3, "Middle Level"),
  new Answer(4, "Machine Level"),
];
var quesTwo = new Question(2, "C is a ___ language", 3, quesTwoAnswers);
questionsArr.push(quesTwo);

var quesThreeAnswers = [
  new Answer(1, "!"),
  new Answer(2, "#"),
  new Answer(3, "~"),
  new Answer(4, ";"),
];
var quesThree = new Question(
  3,
  "Which symbol is used as a statement terminator in C?",
  4,
  quesThreeAnswers
);
questionsArr.push(quesThree);

var quesFourAnswers = [
  new Answer(1, "a"),
  new Answer(2, "b"),
  new Answer(3, "m"),
  new Answer(4, "n"),
];
var quesFour = new Question(
  4,
  "Which escape character can be used to begin a new line in C?",
  4,
  quesFourAnswers
);
questionsArr.push(quesFour);

var quesFiveAnswers = [
  new Answer(1, "Single quotes"),
  new Answer(2, "Double quotes"),
  new Answer(3, "Both a and b"),
  new Answer(4, "None of these"),
];
var quesFive = new Question(
  5,
  "Character constants should be enclosed between ___",
  1,
  quesFiveAnswers
);
questionsArr.push(quesFive);

//   --------------------------------------------

function Question(id, value, rightAnswer, choices) {
  this.id = id;
  this.value = value;
  this.rightAnswer = rightAnswer; //right answer id //id=index+1 ==>start from 1
  this.choices = choices;
}

function Answer(id, value) {
  this.id = id;
  this.value = value;
}

function shuffleQuestion(array) {
  var tmp,
    current,
    top = array.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }

  // return array.splice(0, 5);
  return array;
}

var randomQuestionsArr = shuffleQuestion(questionsArr);

function getQuestion(id) {
  questionValue.innerText = randomQuestionsArr[id - 1]["value"];
  questionNum.innerHTML = `<p>${id}</p>`;
}

function getChoices(quesID) {
  var displayedAnswerId = ["first", "second", "third", "fourth"];
  questionChoices.innerHTML = "";
  for (var i = 0; i < randomQuestionsArr[quesID - 1]["choices"].length; i++) {
    questionChoices.innerHTML += `<li><input type="radio" class="choiceRadio" name='choice' id='${
      displayedAnswerId[i]
    }'>
         <label for='${displayedAnswerId[i]}' >${
      randomQuestionsArr[quesID - 1]["choices"][i]["value"]
    }</label></li>`;
  }

  var realQuesId = randomQuestionsArr[quesID - 1]["id"];
  //check selected color
  for (var j = 0; j < solution.length; j++) {
    if (solution[j]["quesId"] == realQuesId) {
      if (solution[j]["selectedAns"] == 1)
        document.getElementById("first").checked = true;
      else if (solution[j]["selectedAns"] == 2)
        document.getElementById("second").checked = true;
      else if (solution[j]["selectedAns"] == 3)
        document.getElementById("third").checked = true;
      else if (solution[j]["selectedAns"] == 4)
        document.getElementById("fourth").checked = true;
    }
  }
}
//first load to page
getQuestion(1);
currentQuesNumber = 1;
getChoices(1);

function getSelectedAnswer() {
  if (document.getElementById("first").checked) return 1;
  if (document.getElementById("second").checked) return 2;
  if (document.getElementById("third").checked) return 3;
  if (document.getElementById("fourth").checked) return 4;
}

function addQuesSolution(id, ansNumber) {
  if (solution.length) {
    for (var i = 0; i < solution.length; i++) {
      if (id == solution[i]["quesId"]) {
        solution[i]["selectedAns"] = ansNumber;
        return;
      }
    }
    solution.push({
      quesId: id,
      selectedAns: ansNumber,
    });
  } else {
    solution.push({
      quesId: id,
      selectedAns: ansNumber,
    });
  }
}

function save(id) {
  var ansNub = getSelectedAnswer();
  if (ansNub) {
    addQuesSolution(id, ansNub);
  }
}

nextBtn.addEventListener("click", function () {
  // console.log(solution);
  if (currentQuesNumber <= randomQuestionsArr.length - 1) {
    save(randomQuestionsArr[currentQuesNumber - 1]["id"]);
    currentQuesNumber++;
    getQuestion(currentQuesNumber);
    getChoices(currentQuesNumber);
  }
});

preBtn.addEventListener("click", function () {
  // console.log(solution);
  if (currentQuesNumber - 1 > 0) {
    save(randomQuestionsArr[currentQuesNumber - 1]["id"]);
    currentQuesNumber--;
    getQuestion(currentQuesNumber);
    getChoices(currentQuesNumber);
  }
});

// console.log(solution);
//saving last one by submitting
//saving by mark too

markBtn.addEventListener("click", function () {
  for (var i = 0; i < markedArr.length; i++) {
    if (currentQuesNumber == markedArr[i]) return;
  }
  save(randomQuestionsArr[currentQuesNumber - 1]["id"]);
  markedDiv.innerHTML += ` <div id='markedQues'><p>${currentQuesNumber}</p>
  <button class="showMarkedQues">Show</button><button class="deleteMarkedQues">Delete</button></div>`;
  markedArr.push(currentQuesNumber);

  // randomQuestionsArr[currentQuesNumber-1]

  showMarkedQues = document.getElementsByClassName("showMarkedQues");
  deleteMarkedQues = document.getElementsByClassName("deleteMarkedQues");
  //show marked question
  for (var i = 0; i < showMarkedQues.length; i++) {
    showMarkedQues[i].addEventListener("click", function () {
      save(randomQuestionsArr[currentQuesNumber - 1]["id"]);
      // console.log(this.previousSibling.previousSibling.innerText);
      currentQuesNumber = this.previousSibling.previousSibling.innerText;
      getQuestion(currentQuesNumber);
      getChoices(currentQuesNumber);
    });
  }

  //delete from marked div
  for (var i = 0; i < deleteMarkedQues.length; i++) {
    deleteMarkedQues[i].addEventListener("click", function () {
      // this.parentElement.innerHTML = "";
      this.parentElement.style.display = "none";
      for (var j = 0; j < markedArr.length; j++) {
        if (this.previousSibling.previousSibling.previousSibling.innerText == markedArr[j]) markedArr[j] = "";
        // console.log(this.previousSibling.previousSibling.previousSibling.innerText);
      }
      // console.log();
    });
  }
});

function calcResult() {
  for (var i = 0; i < solution.length; i++) {
    for (var j = 0; j < questionsArr.length; j++) {
      if (
        solution[i]["quesId"] == questionsArr[j]["id"] &&
        solution[i]["selectedAns"] == questionsArr[j]["rightAnswer"]
      )
        resultCounter++;
    }
  }
}

function displayResult() {
  examArea.style.display = "none";
  document.getElementById("myProgress").style.display = "none";
  resultArea.style.display = "flex";
  resultValue.innerText = resultCounter;
}

submitBtn.addEventListener("click", function () {
  save(randomQuestionsArr[currentQuesNumber - 1]["id"]);
  calcResult();
  displayResult();
});

/////////////progress bar

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 1100);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        save(randomQuestionsArr[currentQuesNumber - 1]["id"]);
        calcResult();
        displayResult();
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

move();
