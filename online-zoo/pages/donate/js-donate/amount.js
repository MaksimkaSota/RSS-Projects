let anotherAmount = document.querySelector('.input-number');

let amountCircles = document.querySelectorAll('.amount-circle');
let moneyTexts = document.querySelectorAll('.money-text');

anotherAmount.addEventListener('input', function () {
  if (anotherAmount.value.length > anotherAmount.ariaValueMax) {
    anotherAmount.value = anotherAmount.value.slice(0, anotherAmount.maxLength);
  }

  for (let i = 0; i < moneyTexts.length; i++) {
    if (anotherAmount.value === moneyTexts[i].textContent.slice(1)) {
      for (let moneyText of moneyTexts) {
        moneyText.classList.remove('active-sum');
      }
      moneyTexts[i].classList.add('active-sum');
      amountCircles[i].checked = 'true';
    }
  }
})

for (let i = 0; i < amountCircles.length; i++ ) {
  amountCircles[i].addEventListener('change', function () {
    if (amountCircles[i].checked === true) {
      for (let moneyText of moneyTexts) {
        moneyText.classList.remove('active-sum');
      }
      moneyTexts[i].classList.add('active-sum');
    }
    anotherAmount.value = moneyTexts[i].textContent.slice(1);
  })
}
