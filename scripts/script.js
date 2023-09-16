const audio = document.querySelector("audio");
const playBtn = document.querySelector(".play-btn");
const playBtnIcon = document.querySelector(".play-btn-icon");
const currentTime = document.querySelector(".current-time");
const duration = document.querySelector(".duration");
const progressBar = document.querySelector(".progress-bar");
const footer = document.querySelector("footer");

let audioState = "play";
let idleState = false;
let idleTimer = null;

function showFooter(time) {
  clearTimeout(idleTimer);

  if (idleState === true) {
    footer.classList.remove("inactive");
  }
  idleState = false;

  idleTimer = setTimeout(() => {
    footer.classList.add("inactive");
    idleState = true;
  }, time);
}

function calculateTime(duration) {
  const minutes = Math.floor(duration / 60);
  const seconds = String(Math.floor(duration % 60)).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function displayDuration() {
  duration.textContent = calculateTime(audio.duration);
}

if (audio.readyState < 0) {
  displayDuration();
} else {
  audio.addEventListener("loadedmetadata", () => {
    displayDuration();
  });
}

showFooter(5000);

window.addEventListener("mousemove", () => {
  showFooter(3000);
});

audio.addEventListener("timeupdate", () => {
  progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  currentTime.textContent = calculateTime(audio.currentTime);
});

playBtn.addEventListener("click", () => {
  if (audioState === "play") {
    audio.play();
    audioState = "pause";
    playBtnIcon.classList.remove("ph-play");
    playBtnIcon.classList.add("ph-pause");
  } else {
    audio.pause();
    audioState = "play";
    playBtnIcon.classList.add("ph-play");
    playBtnIcon.classList.remove("ph-pause");
  }
});
