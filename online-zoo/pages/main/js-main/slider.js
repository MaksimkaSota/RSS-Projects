const buttonLeft = document.querySelector('#button-left');
const buttonRight = document.querySelector('#button-right');

const cardContainers = document.querySelectorAll('.card-container-slider');
const cards = cardContainers[0].querySelectorAll('.card');

const width = cardContainers[0].clientWidth;

let cardsArray = [];
for (let i = 0; i < cards.length; i++) {
  cardsArray[i] = cards[i];
}

let constCardsArray = [];
for (let i = 0; i < cards.length; i++) {
  constCardsArray[i] = cards[i];
}

let cardContainersArray = [];
for (let i = 0; i < cardContainers.length; i++) {
  cardContainersArray[i] = cardContainers[i];
  cardContainers[i].remove();
}

let flag = false;
let flag2 = false;
let step = 0;
let offset = -1;

let fullCardContainers = [];
function draw() {
  cardsArray.sort(() => Math.random() - 0.5);

  const cardContainers = document.createElement('div');
  cardContainers.classList.add('card-container-slider');
  if (step === 1 && flag2 === false) {
    for (let i = 0; i < constCardsArray.length; i++) {
      cardContainers.append(constCardsArray[i]);
    }
  } else {
    for (let i = 0; i < cardsArray.length; i++) {
      cardContainers.append(cardsArray[i]);
    }
  }

  fullCardContainers.push(cardContainers);

  fullCardContainers[step].style.left = offset * width + 'px';
  if (flag === false) {
    document.querySelector('#card-slider').append(fullCardContainers[step].cloneNode(true));
  } else {
    document.querySelector('#card-slider').prepend(fullCardContainers[step].cloneNode(true));
  }
  if (step + 1 === cardContainersArray.length) {
    step = 0;
  } else {
    step++;
    offset++;
  }
  if (fullCardContainers.length >= 3) {
    fullCardContainers = [];
  }
}

function scrollLeft() {
  flag2 = true;
  flag = false;
  offset = 1;
  buttonLeft.onclick = null;
  let cardContainersArray2 = document.querySelectorAll('.card-container-slider');
  console.log(cardContainersArray2);
  let offset2 = 0;
  for (let i = 0; i < cardContainersArray2.length - 1; i++) {
    cardContainersArray2[i + 1].style.left = offset2 * width - width + 'px';
    offset2++;
  }
  setTimeout(() => {
    cardContainersArray2[0].remove();
    draw();
    buttonLeft.onclick = scrollLeft;
  }, 700)
}

function scrollRight() {
  flag2 = true;
  flag = true;
  offset = -1;
  buttonRight.onclick = null;
  let cardContainersArray2 = document.querySelectorAll('.card-container-slider');
  let offset2 = 1;
  for (let i = 0; i < cardContainersArray2.length - 1; i++) {
    cardContainersArray2[i].style.left = offset2 * width - width + 'px';
    offset2++;
  }
  setTimeout(() => {
    cardContainersArray2[2].remove();
    draw();
    buttonRight.onclick = scrollRight;
  }, 700)
}

draw();draw();draw();
buttonLeft.onclick = scrollLeft;
buttonRight.onclick = scrollRight;


//Что-то
// const buttonLeft = document.querySelector('#button-left');
// const buttonRight = document.querySelector('#button-right');
//
// const cardContainers = document.querySelectorAll('.card-container-slider');
// const cards = cardContainers[0].querySelectorAll('.card');
//
// let cardsArray = [];
// for (let i = 0; i < cards.length; i++) {
//   cardsArray[i] = cards[i];
// }
//
// let cardContainersArray = [];
// for (let i = 0; i < cardContainers.length; i++) {
//   cardContainersArray[i] = cardContainers[i];
//   cardContainers[i].remove();
// }
//
// let step = 0;
// let offset = -1;
//
// let globalArray = [];
//
// function draw() {
//   cardsArray.sort(() => Math.random() - 0.5);
//   const cardContainers = document.createElement('div');
//   cardContainers.classList.add('card-container-slider');
//   for (let i = 0; i < cardsArray.length; i++) {
//     cardContainers.append(cardsArray[i]);
//   }
//   globalArray.push(cardContainers);
//   console.log(globalArray);
//   globalArray[step].style.left = offset * 1160 + 'px';
//   document.querySelector('#card-slider').innerHTML += `${globalArray[step].outerHTML}`;
//   if (step + 1 === cardContainersArray.length) {
//     step = 0;
//   } else {
//     step++;
//     offset++;
//   }
//   if (globalArray.length >= 3) {
//     globalArray = [];
//   }
// }
//
// function left2() {
//   offset = 1;
//   buttonLeft.onclick = null;
//   let cardContainersArray2 = document.querySelectorAll('.card-container-slider');
//   console.log(cardContainersArray2);
//   let offset2 = 0;
//   for (let i = 0; i < cardContainersArray2.length - 1; i++) {
//     cardContainersArray2[i + 1].style.left = offset2 * 1160 - 1160 + 'px';
//     offset2++;
//   }
//   setTimeout(() => {
//     cardContainersArray2[0].remove();
//     draw();
//     buttonLeft.onclick = left2;
//
//   }, 700)
// }
//
// draw();draw();draw();
// buttonLeft.onclick = left2;
//
// let flag = false;
// function right() {
//   offset = -1;
//   buttonRight.onclick = null;
//   let cardContainersArray2 = document.querySelectorAll('.card-container-slider');
//   let offset2 = 1;
//   for (let i = 0; i < cardContainersArray2.length - 1; i++) {
//     cardContainersArray2[i].style.left = offset2 * 1160 - 1160 + 'px';
//     offset2++;
//   }
//   if (flag) {
//     cardContainersArray2[2].style.left = 0 + 'px';
//     cardContainersArray2[0].style.left = 1160 + 'px';
//   }
//   flag = true;
//   console.log(flag)
//   setTimeout(() => {
//     cardContainersArray2[2].remove();
//     draw();
//     buttonRight.onclick = right;
//   }, 700)
// }
//
// buttonRight.onclick = right;

