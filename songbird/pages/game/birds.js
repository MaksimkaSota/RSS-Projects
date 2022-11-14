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

const answerImage = document.querySelector('#answer-image');
const answerTitle = document.querySelector('#answer-title');
const answerSpecies = document.querySelector('#answer-species');
const answerText = document.querySelector('#answer-text');

let mainCounter = 0;

function showQuestion() {
  questionsArray.forEach(question => {
    question.sort(() => Math.random() - 0.5);
  })
  getAudio(audioPlayerQuestionNode, questionsArray[mainCounter][0].audio);
}
showQuestion();

const birdsTxtNode = document.querySelectorAll('.bird-txt');
function showAnswerOptions() {
  for (let i = 0; i < birdsTxtNode.length; i++) {
    birdsTxtNode[i].textContent = birdsData[mainCounter][i].name;
    getAudio(audioPlayerAnswerNode, birdsData[mainCounter][i].audio);
  }
}
showAnswerOptions()

function showAnswer() {
  const birdsNode = document.querySelectorAll('.bird');
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
    })
  }
}
showAnswer();