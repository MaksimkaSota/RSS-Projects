let testimonialsCardsContainer = document.querySelector("#slider-range");
let testimonialsCards = testimonialsCardsContainer.querySelectorAll('.card');

let commentPopup = document.querySelector(".comment-popup");
let commentPopupContainer = document.querySelector(".comment-popup-container");

let imagePopup =  document.querySelector("#image-popup");
let namePopup =  document.querySelector("#name-popup");
let locationPopup =  document.querySelector("#location-popup");
let contentPopup =  document.querySelector("#content-popup");
let imageClosePopup =  document.querySelector("#image-close-popup");

for (let i = 0; i < testimonialsCards.length; i++) {
  testimonialsCards[i].addEventListener('click', function() {
    imagePopup.src = testimonialsCards[i].querySelector('img').src;
    namePopup.textContent =  testimonialsCards[i].querySelector('.name').textContent;
    locationPopup.textContent =  testimonialsCards[i].querySelector('.location').textContent;
    contentPopup.textContent =  testimonialsCards[i].querySelector('.card-content').textContent;
    imageClosePopup.src =  `../../assets/images/burger_x_icon.svg`;

    commentPopup.classList.add("comment-popup-active");
    commentPopupContainer.classList.add('fixed');
  })
}

let buttonCloseCommentPopup = document.querySelector(".close-popup");
buttonCloseCommentPopup.addEventListener('click', function () {
  closeCommentPopup();
})

commentPopupContainer.addEventListener('click', function func(event) {
  if (commentPopupContainer.className === event.target.className) {
    closeCommentPopup();
  }
})

function closeCommentPopup() {
  commentPopup.classList.remove("comment-popup-active");
  commentPopupContainer.classList.remove('fixed');
}