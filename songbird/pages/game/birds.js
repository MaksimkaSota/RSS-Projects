import birdsData from "./birds-data.js";
import getAudio from "./audio.js";

const questionsArray = [];

for (let birds of birdsData) {
  let array = [];
  for (let bird of birds) {
    let object = {
      id: bird.id,
      audio: bird.audio
    }
    array.push(object);
  }
  questionsArray.push(array);
}

const audioPlayerQuestionNode = document.querySelector('.audio-container-one');
const audioPlayerAnswerNode = document.querySelector('.audio-container-two');

const questionImage = document.querySelector('#question-image');
const questionTitle = document.querySelector('#question-title');
console.log(questionTitle);

const answerImage = document.querySelector('#answer-image');
const answerTitle = document.querySelector('#answer-title');
const answerSpecies = document.querySelector('#answer-species');
const answerText = document.querySelector('#answer-text');

const nextBtn = document.querySelector('#next-btn');

let mainCounter = 0;

function showQuestion() {
  questionsArray.forEach(question => {
    question.sort(() => Math.random() - 0.5);
  })
  getAudio(audioPlayerQuestionNode, questionsArray[mainCounter][0].audio);
}
showQuestion();


const birdsNode = document.querySelectorAll('.bird');
const birdsTxtNode = document.querySelectorAll('.bird-txt');
const birdsBtnNode = document.querySelectorAll('.bird-btn');

function showAnswerOptions() {
  for (let i = 0; i < birdsTxtNode.length; i++) {
    birdsTxtNode[i].textContent = birdsData[mainCounter][i].name;
    getAudio(audioPlayerAnswerNode, birdsData[mainCounter][i].audio);
  }
}
showAnswerOptions();

let trueAudio = document.querySelector('#true-audio');
let falseAudio = document.querySelector('#false-audio');

let isWin = false;
let firstClick = true;
function showAnswer() {
  for (let i = 0; i < birdsNode.length; i++) {
    birdsNode[i].addEventListener('click', function() {
      const mainAudioQuestion = document.querySelector('.audio-container-one #main-audio');
      const playBtnQuestion = document.querySelector(".audio-container-one .toggle-play");

      playBtnQuestion.classList.remove("icon-pause");
      playBtnQuestion.classList.add("icon-play");
      mainAudioQuestion.pause();

      answerImage.src = birdsData[mainCounter][i].image;
      answerTitle.textContent = birdsData[mainCounter][i].name;
      answerSpecies.textContent = birdsData[mainCounter][i].species;
      answerText.textContent = birdsData[mainCounter][i].description;
      getAudio(audioPlayerAnswerNode, birdsData[mainCounter][i].audio);

      if (birdsData[mainCounter][i].id === questionsArray[mainCounter][0].id) {
        isWin = true;
        if (firstClick) {
          questionImage.src = birdsData[mainCounter][i].image;
          questionTitle.textContent = birdsData[mainCounter][i].name;
          nextBtn.classList.add('active');
          nextBtn.removeAttribute("disabled");
          trueAudio.load();
          trueAudio.play();
          birdsBtnNode[i].classList.add('bird-btn-true');
        }
        firstClick = false;
      } else {
        if (!isWin) {
          falseAudio.load();
          falseAudio.play();
          birdsBtnNode[i].classList.add('bird-btn-false');
        }
      }
    })
  }
}
showAnswer();

function zeroingAndShowNext() {
  mainCounter++;
  firstClick = true;
  isWin = false;

  nextBtn.classList.remove('active');
  nextBtn.setAttribute("disabled", "true");
  for (let birdBtn of birdsBtnNode) {
    birdBtn.classList.remove('bird-btn-true', 'bird-btn-false');
  }
  showQuestion();
  showAnswerOptions();
  showAnswer();
}

nextBtn.addEventListener('click', zeroingAndShowNext);