const range = document.querySelector('input[type="range"]');

let sliderContainerRange = document.querySelector('#slider-container-range');
let sliderRange = document.querySelector('#slider-range');
let card = sliderRange.querySelectorAll('.card');
let offsetWidth = card[0].offsetWidth + 30;

let newValue = 0;
function rangeValue() {
  newValue = - range.value;
  sliderRange.style.left = newValue * offsetWidth + 'px';
  sliderRange.classList.add('transition');
}
range.addEventListener("input", rangeValue);

let clicked = false;
let xAxis;

sliderContainerRange.addEventListener("mouseup", function()  {
  sliderContainerRange.style.cursor = `grab`;
  rangeValue();
  sliderRange.classList.remove('transition');
});

sliderContainerRange.addEventListener('mousedown', function(event) {
  clicked = true;
  xAxis = event.offsetX - sliderRange.offsetLeft;
  sliderContainerRange.style.cursor = `grabbing`;
  sliderRange.classList.remove('transition');
})

window.addEventListener("mouseup", function()  {
  clicked = false;
})

sliderContainerRange.addEventListener("mousemove", function(event)  {
  if (!clicked) return;
  event.preventDefault();

  sliderRange.style.left = `${event.offsetX - xAxis}px`
  checkSize();

    if (parseInt(sliderRange.style.left) <= 0 * offsetWidth  ) {
      range.value = 0;
    }
    if (parseInt(sliderRange.style.left) <= -1 * offsetWidth  ) {
      range.value = 1;
    }
    if (parseInt(sliderRange.style.left) <= -2 * offsetWidth  ) {
      range.value = 2;
    }
    if (parseInt(sliderRange.style.left) <= -3 * offsetWidth  ) {
      range.value = 3;
    }
    if (parseInt(sliderRange.style.left) <= -4 * offsetWidth  ) {
      range.value = 4;
    }
    if (parseInt(sliderRange.style.left) <= -5 * offsetWidth  ) {
      range.value = 5;
    }
    if (parseInt(sliderRange.style.left) <= -6 * offsetWidth  ) {
      range.value = 6;
    }
    if (parseInt(sliderRange.style.left) <= -7 * offsetWidth  ) {
      range.value = 7;
    }
});

function checkSize() {
  let sliderContainerRangeOut = sliderContainerRange.getBoundingClientRect();
  let sliderRangeIn = sliderRange.getBoundingClientRect();
  console.log(sliderRangeIn.width - sliderContainerRangeOut.width)
  if (parseInt(sliderRange.style.left) > 0) {
    sliderRange.style.left = `0px`;
  } else if (sliderRangeIn.right < sliderContainerRangeOut.right) {
    sliderRange.style.left = `-${sliderRangeIn.width - sliderContainerRangeOut.width}px`;
  }
}



