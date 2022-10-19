let body = document.querySelector('body');

// The number of moves
let step = 0;

let html = `
  <div class="game-container">
    <div class="game-container-inner">
      <h1 class="title">Gem Puzzle</h1>
      <div class="button-block">
        <button id="shuffle" class="game-button">Shuffle and start</button>
        <button id="save" class="game-button">Save</button>
        <button id="result" class="game-button">Result</button>
      </div>
      <div class="game-block"></div>
      <div class="info-block">
        <p>Moves:<span class="moves">0</span></p>
        <p>Time:<span class="minutes-container">00</span>:<span class="seconds-container">00</span></p>
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
  </div>
`
body.insertAdjacentHTML("afterbegin" , html);

// The game duration in minutes and seconds
let seconds = 0;
let minutes = 0;
let secondsContainer = document.querySelector(".seconds-container");
let minutesContainer = document.querySelector(".minutes-container");
let interval;
let flag = true;

let countItems = 16;
let sizeGameArr = [];
let winFlatArr = [];

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
    gameBlockContent += `<button class="item size4x4">${sizeGameArr[i]}</button>`
  }
  gameBlock.innerHTML = gameBlockContent;

  items = Array.from(gameBlock.querySelectorAll('.item'));
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
  //Для быстрой проверки комментировать тут!
  shuffle();
}

// 2. Position of elements
position();
function position() {
  items[countItems - 1].style.display = 'none';
  matrix = getMatrix (
    items.map((item) => Number(item.innerHTML)), Math.sqrt(countItems)
  )
  setPositionItems(matrix);
}

// 3. Shuffle of elements
let shuffleButton = document.querySelector('#shuffle');
shuffleButton.addEventListener('click', function() {
  shuffle()
  zeroing();
})

shuffle();
function shuffle() {
  let flatMatrix = matrix.flat();
  const shuffledArray = shuffleArray(flatMatrix);
  matrix = getMatrix(shuffledArray, Math.sqrt(countItems));
  setPositionItems(matrix);
}

//4. Change position by click
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
      }
    });
    // Drag functionality
    // button.addEventListener("dragstart", dragStart);  //click an image to drag
    // button.addEventListener("dragover", dragOver);    //moving image around while clicked
    // button.addEventListener("dragenter", dragEnter);  //dragging image onto another one
    // button.addEventListener("dragleave", dragLeave);  //dragged image leaving anohter image
    // button.addEventListener("drop", dragDrop);        //drag an image over another image, drop the image
    // button.addEventListener("dragend", dragEnd);      //after drag drop, swap the two tiles
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
  step = 0;
  document.querySelector('.moves').innerHTML = `${step}`;
  flag = true;
  clearInterval(interval);
  seconds = 0;
  minutes = 0;
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

// let currTile;
// let otherTile;
//
// function dragStart() {
//   currTile = this; //this refers to the img tile being dragged
//   console.log(currTile);
// }
//
// function dragOver(e) {
//   e.preventDefault();
// }
//
// function dragEnter(e) {
//   e.preventDefault();
// }
//
// function dragLeave() {
//
// }
//
// function dragDrop() {
//   otherTile = this; //this refers to the img tile being dropped on
// }
//
// function dragEnd() {
//   let currentNumber = currTile.innerHTML;
//
//   let otherNumber = otherTile.innerHTML;
//
//   currTile.innerHTML = otherNumber;
//   otherTile.innerHTML = currentNumber;
//
//   // if (!otherTile.src.includes("3.jpg")) {
//   //   return;
//   // }
//   //
//   // let currCoords = currTile.id.split("-"); //ex) "0-0" -> ["0", "0"]
//   // let r = parseInt(currCoords[0]);
//   // let c = parseInt(currCoords[1]);
//   //
//   // let otherCoords = otherTile.id.split("-");
//   // let r2 = parseInt(otherCoords[0]);
//   // let c2 = parseInt(otherCoords[1]);
//   //
//   // let moveLeft = r == r2 && c2 == c-1;
//   // let moveRight = r == r2 && c2 == c+1;
//   //
//   // let moveUp = c == c2 && r2 == r-1;
//   // let moveDown = c == c2 && r2 == r+1;
//   //
//   // let isAdjacent = moveLeft || moveRight || moveUp || moveDown;
//   //
//   // if (isAdjacent) {
//   //   let currImg = currTile.src;
//   //   let otherImg = otherTile.src;
//   //
//   //   currTile.src = otherImg;
//   //   otherTile.src = currImg;
//   //
//   //   turns += 1;
//   //   document.getElementById("turns").innerText = turns;
//   // }
//   //
//
// }


