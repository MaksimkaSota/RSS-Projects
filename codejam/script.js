let body = document.querySelector('body');

let html = `
  <div class="game-container">
    <div class="game-container-inner">
      <h1 class="title">Gem Puzzle</h1>
      <div class="button-block">
        <button id="shuffle" class="game-button">Shuffle and start</button>
        <button id="save" class="game-button">Save</button>
        <button id="result" class="game-button">Result</button>
        <button id="sound" class="game-button sound-on">Sound (on/off)</button>
      </div>
      <div class="game-block"></div>
      <div class="info-block">
        <p>Moves: <span class="moves">0</span></p>
        <p>Time: <span class="minutes-container">00</span>:<span class="seconds-container">00</span></p>
      </div>
      <div class="choice-size-block">
        <p class="text">Other size:</p>
        <div class="size-container">
          <a class="size" id="size3x3" href="#">3x3</a>
          <a class="size" id="size4x4" href="#">4x4</a>
          <a class="size" id="size5x5" href="#">5x5</a>
          <a class="size" id="size6x6" href="#">6x6</a>
          <a class="size" id="size7x7" href="#">7x7</a>
          <a class="size" id="size8x8" href="#">8x8</a>
        </div>
      </div>
    </div>
    <audio id="audio" src="assets/zvuk-vzryva-dlya-video.mp3"></audio>
  </div>
`
body.innerHTML = html;

// Audio on/off
let soundFlag = true;
let audio = document.querySelector('#audio');
document.querySelector('#sound').addEventListener('click', function () {
  soundFlag ? soundFlag = false : soundFlag = true;
  document.querySelector('#sound').classList.toggle("sound-on");
})

const countItemsFromStorage = localStorage.getItem("countItems");
let countItems = countItemsFromStorage ? Number(countItemsFromStorage) : 16;
let sizeGameArr = [];
let winFlatArr = [];

// The game duration in minutes and seconds
const secondsFromStorage = localStorage.getItem(`matrix_${countItems}_seconds`);
const minutesFromStorage = localStorage.getItem(`matrix_${countItems}_minutes`);
let seconds = secondsFromStorage ? Number(secondsFromStorage) : 0;
let minutes = minutesFromStorage ? Number(minutesFromStorage) : 0;
let secondsContainer = document.querySelector(".seconds-container");
let minutesContainer = document.querySelector(".minutes-container");
if (seconds < 10) {
  secondsContainer.innerHTML = `0${seconds}`;
}
if (seconds >= 10) {
  secondsContainer.innerHTML = `${seconds}`;
}
if (seconds >= 60) {
  minutes++;
  minutesContainer.innerHTML = `0${minutes}`;
  seconds = 0;
  secondsContainer.innerHTML = `00`;
}
if (minutes > 9) {
  minutesContainer.innerHTML = `${minutes}`;
}
let interval;
let flag = true;

// The number of moves
const stepFromStorage = localStorage.getItem(`matrix_${countItems}_step`);
let step = stepFromStorage ? Number(stepFromStorage) : 0;
document.querySelector('.moves').innerHTML = `${step}`;

let items = [];
let matrix = [];

getGame();
function getGame() {
  for (let i = 1; i <= countItems; i++) {
    sizeGameArr.push(i);
    winFlatArr.push(i);
  }

  let gameBlock = body.querySelector('.game-block');
  let gameBlockContent = '';
  for (let i = 0; i < sizeGameArr.length; i++) {
    gameBlockContent += `<button class="item size${Math.sqrt(countItems)}x${Math.sqrt(countItems)}" draggable="true">${sizeGameArr[i]}</button>`
  }
  gameBlock.innerHTML = gameBlockContent;

  items = Array.from(gameBlock.querySelectorAll('.item'));
}

let sizeButtons = document.querySelectorAll('.size');
for (let sizeButton of sizeButtons) {
  if (sizeButton.id === `size${Math.sqrt(countItems)}x${Math.sqrt(countItems)}`) {
    sizeButton.classList.add('active');
  }
}

// 1. Choice of sizes
let size3x3button = body.querySelector('#size3x3');
size3x3button.addEventListener('click', function(event) {
  countItems = 9;
  size(event, countItems);
  this.classList.add('active');
})

let size4x4button = body.querySelector('#size4x4');
size4x4button.addEventListener('click', function(event) {
  countItems = 16;
  size(event, countItems);
  this.classList.add('active');
})

let size5x5button = body.querySelector('#size5x5');
size5x5button.addEventListener('click', function(event) {
  countItems = 25;
  size(event, countItems);
  this.classList.add('active');
})

let size6x6button = body.querySelector('#size6x6');
size6x6button.addEventListener('click', function(event) {
  countItems = 36;
  size(event, countItems);
  this.classList.add('active');
})

let size7x7button = body.querySelector('#size7x7');
size7x7button.addEventListener('click', function(event) {
  countItems = 49;
  size(event, countItems);
  this.classList.add('active');
})

let size8x8button = body.querySelector('#size8x8');
size8x8button.addEventListener('click', function(event) {
  countItems = 64;
  size(event, countItems);
  this.classList.add('active');
})

function size(event, countItems) {
  let sizeButtons = document.querySelectorAll('.size');
  for (let sizeButton of sizeButtons) {
    sizeButton.classList.remove('active');
  }
  event.preventDefault();
  sizeGameArr = [];
  winFlatArr = [];
  getGame();
  let itemsNode = document.querySelectorAll('.item');
  for (let item of itemsNode) {
    item.removeAttribute('class');
    item.classList.add('item');
    item.classList.add(`size${Math.sqrt(countItems)}x${Math.sqrt(countItems)}`);
  }
  position();
  changePosition();
  zeroing();
  if (!localStorage.getItem(`matrix_${countItems}`)) {
    shuffle();
  }
  localStorage.setItem("countItems", countItems);
}

// 2. Position of elements
position();
function position() {
  // items[countItems - 1].style.display = 'none';
  items[countItems - 1].style.opacity = '0';
  matrix = getMatrix (
    items.map((item) => Number(item.innerHTML)), Math.sqrt(countItems)
  )

  let matrixFromStore = localStorage.getItem(`matrix_${countItems}`)
  matrix = matrixFromStore ? JSON.parse(matrixFromStore) : matrix;
  setPositionItems(matrix);
}

// 3. Shuffle of elements
let shuffleButton = document.querySelector('#shuffle');
shuffleButton.addEventListener('click', function() {
  shuffle();
  localStorage.removeItem(`matrix_${countItems}_step`)
  localStorage.removeItem(`matrix_${countItems}_seconds`)
  localStorage.removeItem(`matrix_${countItems}_minutes`)
  zeroing();
})

// Save matrix, step, seconds, minutes in localStorage
document.querySelector('#save').addEventListener('click', function () {
  localStorage.setItem(`matrix_${countItems}`, JSON.stringify(matrix));

  localStorage.setItem(`matrix_${countItems}_step`, step);

  localStorage.setItem(`matrix_${countItems}_seconds`, seconds);
  localStorage.setItem(`matrix_${countItems}_minutes`, minutes);

  clearInterval(interval);
  flag = true;
})

if (!localStorage.getItem(`matrix_${countItems}`)) {
  shuffle();
}

function shuffle() {
  let flatMatrix = matrix.flat();
  const shuffledArray = shuffleArray(flatMatrix);
  matrix = getMatrix(shuffledArray, Math.sqrt(countItems));
  setPositionItems(matrix);
}

//4. Change position by click and Drag/Drop
let blankButton;
changePosition();
function changePosition() {
  let blankNumber = countItems;
  let gameButtons = document.querySelectorAll('.item');
  for (let button of gameButtons) {
    button.addEventListener('click', function () {
      if (!button) {
        return;
      }
      let buttonNumber = Number(button.innerHTML);
      let buttonCoords = findCoordinatesByNumber(buttonNumber, matrix);
      let blankCoords = findCoordinatesByNumber(blankNumber, matrix);
      let isValid = isValidForSwap(buttonCoords, blankCoords);

      if (isValid) {
        swap(blankCoords, buttonCoords, matrix);
        setPositionItems(matrix);

        step++;
        document.querySelector('.moves').innerHTML = `${step}`;
        if (flag) {
          interval = setInterval(clockTimer, 1000);
        }
        flag = false;

        if (soundFlag) {
          audio.load();
          audio.play();
        }
      }
    });
    // Drag functionality
    let buttonCoords;
    let blankCoords;
    button.addEventListener("dragstart", function() { //click button to drag
      let buttonNumber = Number(button.innerHTML);
      buttonCoords = findCoordinatesByNumber(buttonNumber, matrix);
      blankCoords = findCoordinatesByNumber(blankNumber, matrix);
    });
    button.addEventListener("dragover", (event) => event.preventDefault()); //moving button around while clicked
    button.addEventListener("dragenter",(event) => event.preventDefault());  //dragging button onto another one
    button.addEventListener("drop", function() { //drag an image over another image, drop the image
      blankButton = this;
    });
    button.addEventListener("dragend", function() { //after drag drop, swap the two tiles
      if (+blankButton.innerHTML !== blankNumber) {
        return;
      }
      let isValid = isValidForSwap(buttonCoords, blankCoords);
      if (isValid) {
        swap(blankCoords, buttonCoords, matrix);
        setPositionItems(matrix);

        step++;
        document.querySelector('.moves').innerHTML = `${step}`;
        if (flag) {
          interval = setInterval(clockTimer, 1000);
        }
        flag = false;

        if (soundFlag) {
          audio.load();
          audio.play();
        }
      }
    });
  }
}

//Helpers
function getMatrix(arr, count) {
  let matrix = [];
  for (let i = 0; i < count; i++) {
    matrix.push([]);
  }
  let y = 0;
  let x = 0;
  for (let i = 0; i < arr.length; i++) {
    if (x >= count) {
      y++;
      x = 0;
    }
    matrix[y][x] = arr[i];
    x++;
  }
  return matrix;
}

function setPositionItems(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const value = matrix[y][x];
      const node = items[value - 1];
      setNodeStyles(node, x, y);
    }
  }
}

function setNodeStyles(node, x, y) {
  const shiftPs = 100;
  node.style.transform = `translate(${x * shiftPs}%, ${y * shiftPs}%)`;
}

function shuffleArray(arr) {
  return arr.map(value => ({value, sort: Math.random()}))
            .sort((a, b) => a.sort - b.sort)
            .map(({value}) => value);
}

function findCoordinatesByNumber(number, matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === number) {
        return {x, y};
      }
    }
  }
  return null;
}

function isValidForSwap(coords1, coords2) {
  let diffX = Math.abs(coords1.x - coords2.x);
  let diffY = Math.abs(coords1.y - coords2.y);

  return (diffX === 1 || diffY === 1) && (coords1.x === coords2.x || coords1.y === coords2.y);
}

function swap(coords1, coords2, matrix) {
  let coords1Number = matrix[coords1.y][coords1.x];
  matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
  matrix[coords2.y][coords2.x] = coords1Number;

  //5. Show won
  if (isWon(matrix)) {
    setTimeout(() => {
      if (seconds < 10) {
        seconds = `0${seconds}`
      }
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      alert(`Hooray! You solved the puzzle in ${minutes}:${seconds} and ${step} moves!`);

      localStorage.removeItem(`matrix_${countItems}`);
      localStorage.removeItem(`matrix_${countItems}_step`);
      localStorage.removeItem(`matrix_${countItems}_seconds`);
      localStorage.removeItem(`matrix_${countItems}_minutes`);

      //Save top 10 results in localStorage
      let storedResults = localStorage.getItem(`results${countItems}`);
      let results = storedResults ? JSON.parse(storedResults) : [];
      let resultObject = {
        step: step,
        timeMinutes: minutes,
        timeSecond: seconds,
      }
      results.push(resultObject);
      results.sort((a, b) => {
        if (a.step > b.step) return 1;
        if (a.step < b.step) return -1;
        if (a.step === b.step) {
          if (a.timeMinutes > b.timeMinutes) return 1;
          if (a.timeMinutes < b.timeMinutes) return -1;
          if (a.timeMinutes === b.timeMinutes) {
            if (a.timeSecond > b.timeSecond) return 1;
            if (a.timeSecond < b.timeSecond) return -1;
          }
        }
      });
      if (results.length > 10) {
        results.pop();
      }
      localStorage.setItem(`results${countItems}`, JSON.stringify(results));

      zeroing();
    }, 300);

  }
}

function clockTimer() {
  seconds++;
  if (seconds < 10) {
    secondsContainer.innerHTML = `0${seconds}`;
  }
  if (seconds >= 10) {
    secondsContainer.innerHTML = `${seconds}`;
  }
  if (seconds >= 60) {
    minutes++;
    minutesContainer.innerHTML = `0${minutes}`;
    seconds = 0;
    secondsContainer.innerHTML = `00`;
  }
  if (minutes > 9) {
    minutesContainer.innerHTML = `${minutes}`;
  }
}

function zeroing() {
  let stepFromStorage = localStorage.getItem(`matrix_${countItems}_step`);
  step = stepFromStorage ? Number(stepFromStorage) : 0;
  document.querySelector('.moves').innerHTML = `${step}`;
  flag = true;
  clearInterval(interval);
  let secondsFromStorage = localStorage.getItem(`matrix_${countItems}_seconds`);
  let minutesFromStorage = localStorage.getItem(`matrix_${countItems}_minutes`);
  seconds = secondsFromStorage ? Number(secondsFromStorage) : 0;
  minutes = minutesFromStorage ? Number(minutesFromStorage) : 0;
  secondsContainer.innerHTML = `0${seconds}`;
  minutesContainer.innerHTML = `0${minutes}`;
}

function isWon(matrix) {
  const flatMatrix = matrix.flat();
  for (let i = 0; i < winFlatArr.length; i++) {
    if (flatMatrix[i] !== winFlatArr[i]) {
      return false;
    }
  }
  return true;
}

//Show top 10 results
document.querySelector("#result").addEventListener('click', function () {
  let results = localStorage.getItem(`results${countItems}`);

  let divTableContainer = document.querySelector('.table-container');
  if (divTableContainer) {
    divTableContainer.remove();
  }

  if (results) {
    let divTableContainer = document.createElement('div');
    divTableContainer.classList.add('fixed');
    divTableContainer.classList.add('table-container');
    divTableContainer.addEventListener('click', (event) => {
      if (divTableContainer.className === event.target.className) {
        divTableContainer.remove();
      }
    })

    let table = document.createElement('table');
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <th>Top</th>
      <th>Moves</th>
      <th>Time</th>
    `;
    table.append(tr);
    JSON.parse(results).forEach((item, index) => {
      let tr = document.createElement('tr');
      let trInner = `
          <td>${index+1}</td>
          <td>${item.step}</td>
          <td>${item.timeMinutes}:${item.timeSecond}</td>
      `
      tr.innerHTML += trInner;
      table.append(tr);
    });

    let buttonClose = document.createElement("button");
    buttonClose.innerHTML = 'Close';
    buttonClose.classList.add('button-close');
    buttonClose.addEventListener('click', function() {
      divTableContainer.remove();
    })

    divTableContainer.append(table, buttonClose);
    body.append(divTableContainer);
  } else {
    alert('There are no best scores! Play the game to get to the top!');
  }
})






