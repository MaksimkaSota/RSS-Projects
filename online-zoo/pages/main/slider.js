// // const left = document.querySelector('#left');
// // const right = document.querySelector('#right');
// // const slider = document.querySelector('#card-slider');
// // const cardContainers = document.querySelectorAll('.card-container-slider');
// //
// // let counter = 0;
// // const stepSize = cardContainers[0].clientWidth;
// // let div = document.createElement("div");
// // div.classList.add('card-container-slider');
// // div.innerHTML = `
// //      <div class="card">
// //       <img class="animal-photo" src="../../assets/images/giant-pandas.jpg" alt="">
// //       <div class="text-container">
// //         <div>
// //           <p class="name">Giant Pandas</p>
// //           <p class="location">Native to Southwest China</p>
// //         </div>
// //         <img class="banana" src="../../assets/images/banana-bamboo_icon.svg" alt="">
// //       </div>
// //     </div>
// //     <div class="card">
// //       <img class="animal-photo" src="../../assets/images/eagles.jpg" alt="">
// //       <div class="text-container">
// //         <div>
// //           <p class="name">Eagles</p>
// //           <p class="location">Native to South America</p>
// //         </div>
// //         <img class="meet" src="../../assets/images/meet-fish_icon.svg" alt="">
// //       </div>
// //     </div>
// //     <div class="card">
// //       <img class="animal-photo" src="../../assets/images/gorillas.jpg" alt="">
// //       <div class="text-container">
// //         <div>
// //           <p class="name">Gorillas</p>
// //           <p class="location">Native to Congo</p>
// //         </div>
// //         <img class="banana" src="../../assets/images/banana-bamboo_icon.svg" alt="">
// //       </div>
// //     </div>
// //     <div class="card">
// //       <img class="animal-photo" src="../../assets/images/two-toed-sloth.jpg" alt="">
// //       <div class="text-container">
// //         <div>
// //           <p class="name">Two-toed Sloth</p>
// //           <p class="location">Mesoamerica, South America</p>
// //         </div>
// //         <img class="banana" src="../../assets/images/banana-bamboo_icon.svg" alt="">
// //       </div>
// //     </div>
// //     <div class="card">
// //       <img class="animal-photo" src="../../assets/images/cheetahs.jpg" alt="">
// //       <div class="text-container">
// //         <div>
// //           <p class="name">cheetahs</p>
// //           <p class="location">Native to Africa</p>
// //         </div>
// //         <img class="meet" src="../../assets/images/meet-fish_icon.svg" alt="">
// //       </div>
// //     </div>
// //     <div class="card">
// //       <img class="animal-photo" src="../../assets/images/penguins.jpg" alt="">
// //       <div class="text-container">
// //         <div>
// //           <p class="name">Penguins</p>
// //           <p class="location">Native to Antarctica</p>
// //         </div>
// //         <img class="meet" src="../../assets/images/meet-fish_icon.svg" alt="">
// //       </div>
// //     </div>
// //   `
// // right.addEventListener('click', function(evt) {
// //   counter >= cardContainers.length ? counter = -1 : null;
// //   counter++;
// //   evt.preventDefault()
// //   slider.classList.add('sliderAnimation');
// //   slider.style.transform = `translateX(-${stepSize * counter}px)`
// //
// //   slider.append(div);
// // })
// //
// // left.addEventListener('click', function(evt) {
// //   slider.prepend(div);
// //   counter <= 0 ? counter = 2 : null;
// //   counter--;
// //   evt.preventDefault()
// //   slider.classList.add('sliderAnimation');
// //   slider.style.transform = `translateX(-${stepSize * counter}px)`
// // })
//
// const left = document.querySelector('#left');
// const right = document.querySelector('#right');
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
// console.log(cardsArray);
// console.log(cardContainersArray);
//
// let step = 0;
// let offset = 0;
//
// right.addEventListener('click', function(evt) {
//   evt.preventDefault();
//   cardsArray.sort(() => Math.random() - 0.5);
//
//   const cardContainers = document.createElement('div');
//   cardContainers.classList.add('card-container-slider');
//   for (let i = 0; i < cardsArray.length; i++) {
//     cardContainers.append(cardsArray[i])
//   }
//
//
//   slider.classList.add('sliderAnimation');
//   slider.style.transform = `translateX(-${stepSize * counter}px)`
//
//   slider.append(div);
// })
//
