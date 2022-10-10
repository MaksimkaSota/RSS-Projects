let buttonBurger = document.querySelector(".burger");
let menuBurger = document.querySelector(".burger-menu");
let menuContainerBurger = document.querySelector(".burger-menu-container");

buttonBurger.addEventListener('click', function() {
  menuBurger.classList.add('burger-active');
  menuContainerBurger.classList.add('fixed');
})

let buttonCloseBurger = document.querySelector(".burger-close-button");
buttonCloseBurger.addEventListener('click', function () {
  closeBurgerMenu();
})

menuContainerBurger.addEventListener('click', function func(event) {
  if (menuContainerBurger.className === event.target.className) {
    closeBurgerMenu();
  }
})

function closeBurgerMenu() {
  menuBurger.classList.remove("burger-active");
  menuContainerBurger.classList.remove('fixed');
}

