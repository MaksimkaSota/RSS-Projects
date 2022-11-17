import {startDataRu, startDataEn} from './language-data.js'

console.log('Score: 250 / 270');

const languageElems = document.querySelectorAll('[data-language-id]');
const selectLanguage = document.querySelector('#language');
const startLink = document.querySelector('.start-link');

changeLanguage(startDataRu);
startLink.title = 'Вы уже на главной';

selectLanguage.addEventListener('change', function() {
  if (selectLanguage.value === 'ru') {
    localStorage.setItem('birdsDataLang', 'ru');
    changeLanguage(startDataRu);
    startLink.title = 'Вы уже на главной';
  }
  if (selectLanguage.value === 'en') {
    localStorage.setItem('birdsDataLang', 'en');
    changeLanguage(startDataEn);
    startLink.title = 'You are already on the main page';
  }
})

const startDataLangStorage = localStorage.getItem("birdsDataLang");
if (startDataLangStorage === 'ru') {
  selectLanguage.selectedIndex = 0;
  changeLanguage(startDataRu);
  startLink.title = 'Вы уже на главной';
}
if (startDataLangStorage === 'en') {
  selectLanguage.selectedIndex = 1;
  changeLanguage(startDataEn);
  startLink.title = 'You are already on the main page';
}

function changeLanguage(startData) {
  for (let elem of languageElems) {
    elem.textContent = startData[elem.dataset.languageId];
  }
}