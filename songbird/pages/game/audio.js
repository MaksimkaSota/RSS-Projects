function getAudio(audioContainer, song) {
  audioContainer.innerHTML += `
    <div class="audio-player">
      <div class="timeline">
        <div class="progress"></div>
      </div>
      <div class="controls">
        <div class="play-container">
          <div class="toggle-play icon-play"></div>
        </div>
        <div class="time">
          <div class="current">0:00</div>
          <div class="divider">/</div>
          <div class="length"></div>
        </div>
        <div class="name">Song Bird</div>
        <div class="volume-container">
          <div class="volume-button">
            <div class="volume icon-sound-on"></div>
          </div>
          <div class="volume-slider">
            <div class="volume-percentage"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const audioPlayer = audioContainer.querySelector(".audio-player");
  const audio = new Audio(song);

  audio.addEventListener("loadeddata", function()  {
    audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(audio.duration);
    audio.volume = .75;
  });

  //click on timeline to skip around
  const timeline = audioContainer.querySelector(".timeline");
  timeline.addEventListener("click", function(event) {
    const timelineWidth = window.getComputedStyle(timeline).width;
    audio.currentTime = event.offsetX / parseInt(timelineWidth) * audio.duration;
  });

  //click volume slider to change volume
  const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
  volumeSlider.addEventListener('click', function(event) {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = event.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
  });

  //check audio percentage and update time accordingly
  setInterval(() => {
    const progressBar = audioPlayer.querySelector(".progress");
    progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
    audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
      audio.currentTime
    );
  }, 500);

  //toggle between playing and pausing on button click
  const playBtn = audioPlayer.querySelector(".controls .toggle-play");
  playBtn.addEventListener("click", function() {
    if (audio.paused) {
      playBtn.classList.remove("icon-play");
      playBtn.classList.add("icon-pause");
      audio.play();
    } else {
      playBtn.classList.remove("icon-pause");
      playBtn.classList.add("icon-play");
      audio.pause();
    }
  });

  audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
    const volumeEl = audioPlayer.querySelector(".volume-container .volume");
    audio.muted = !audio.muted;
    if (audio.muted) {
      volumeEl.classList.remove("icon-sound-on");
      volumeEl.classList.add("icon-sound-off");
    } else {
      volumeEl.classList.add("icon-sound-on");
      volumeEl.classList.remove("icon-sound-off");
    }
  });

  //turn 128 seconds into 2:08
  function getTimeCodeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;

    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
  }
}

export default getAudio;
// export {getAudio as default};
// export default перед функцией



