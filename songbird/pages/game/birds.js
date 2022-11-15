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

const score = document.querySelector('.score');
const finishScore = document.querySelector('#finish-score');

const audioPlayerQuestionNode = document.querySelector('.audio-container-one');
const audioPlayerAnswerNode = document.querySelector('.audio-container-two');
const trueAudio = document.querySelector('#true-audio');
const falseAudio = document.querySelector('#false-audio');

const categoryBirds = document.querySelectorAll('.category-birds');

const questionImage = document.querySelector('#question-image');
const questionTitle = document.querySelector('#question-title');

const birdsNode = document.querySelectorAll('.bird');
const birdsTxtNode = document.querySelectorAll('.bird-txt');
const birdsBtnNode = document.querySelectorAll('.bird-btn');

const previewAboutBird = document.querySelector('.preview');
const aboutBird = document.querySelector('#about-bird');
const answerImage = document.querySelector('#answer-image');
const answerTitle = document.querySelector('#answer-title');
const answerSpecies = document.querySelector('#answer-species');
const answerText = document.querySelector('#answer-text');

const questionBlock = document.querySelector('.question-block');
const choiceBirdBlock = document.querySelector('.block-one');
const aboutBirdBlock = document.querySelector('.about-bird');
const victoryBlock = document.querySelector('.victory-block');

const nextBtn = document.querySelector('#next-btn');
const newGameBtn = document.querySelector('#new-game-btn');

let mainCounter = 0;
let scoreCounter = 0;
let helpScoreCounter = 5;
let isWin = false;
let firstClick = true;

function showQuestion() {
  questionsArray.forEach(question => {
    question.sort(() => Math.random() - 0.5);
  })
  getAudio(audioPlayerQuestionNode, questionsArray[mainCounter][0].audio);
}
showQuestion();

function showAnswerOptions() {
  for (let i = 0; i < birdsTxtNode.length; i++) {
    birdsTxtNode[i].textContent = birdsData[mainCounter][i].name;
    getAudio(audioPlayerAnswerNode, birdsData[mainCounter][i].audio);
  }
}
showAnswerOptions();

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
          scoreCounter += helpScoreCounter;
          aboutBird.style = 'display: block';
          previewAboutBird.style = 'display: none';
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
          aboutBird.style = 'display: block';
          previewAboutBird.style = 'display: none';
          if (birdsBtnNode[i].className !== 'bird-btn bird-btn-false') {
            falseAudio.load();
            falseAudio.play();
            helpScoreCounter--;
          }
          birdsBtnNode[i].classList.add('bird-btn-false');
        }
      }

      score.textContent = `Score: ${scoreCounter}`
    })
  }
}
showAnswer();

function showNext() {
  mainCounter++;
  helpScoreCounter = 5;
  if (mainCounter === 6) {
    questionBlock.style = 'display: none';
    choiceBirdBlock.style = 'display: none';
    aboutBirdBlock.style = 'display: none';
    nextBtn.style ='display: none';
    victoryBlock.style = 'display: block';
    finishScore.textContent = `${scoreCounter}`;
    mainCounter = 0;
  } else {
    categoryBirds[mainCounter].classList.add('active');
    zeroing();
    showQuestion();
    showAnswerOptions();
  }
}

function startNewGame() {
  scoreCounter = 0;
  questionBlock.style = 'display: flex';
  choiceBirdBlock.style = 'display: block';
  aboutBirdBlock.style = 'display: block';
  nextBtn.style ='display: block';
  victoryBlock.style = 'display: none';

  for (let category of categoryBirds) {
    category.classList.remove('active');
  }
  categoryBirds[mainCounter].classList.add('active');

  zeroing();
  showQuestion();
  showAnswerOptions();
}

function zeroing() {
  firstClick = true;
  isWin = false;

  questionImage.src = '../../assets/images/question.png';
  questionTitle.textContent = '*******';

  for (let birdBtn of birdsBtnNode) {
    birdBtn.classList.remove('bird-btn-true', 'bird-btn-false');
  }

  aboutBird.style = 'display: none';
  previewAboutBird.style = 'display: block';

  nextBtn.classList.remove('active');
  nextBtn.setAttribute("disabled", "true");
}

nextBtn.addEventListener('click', showNext);
newGameBtn.addEventListener('click', startNewGame)