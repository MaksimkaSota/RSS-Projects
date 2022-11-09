import birdsData from "./birds-data.js";
import getAudio from "./audio.js";
console.log(birdsData);
const audio1 = document.querySelector('.audio-container-one');
const audio2 = document.querySelector('.audio-container-two');
getAudio(audio1, "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3")
getAudio(audio2, "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3")