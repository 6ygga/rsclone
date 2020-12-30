const previous = document.querySelector('.panel__pre');
const play = document.querySelector('.panel__play');
const next = document.querySelector('.panel__next');
const title = document.querySelector('.block-right__song-title');
const recentVolume = document.querySelector('.block-left__volume');
const volumeShow = document.querySelector('.volume__show');
const volumeIcon = document.querySelector('.volume__icon');
const slider = document.querySelector('.duration__slider');
// const showDuration = document.querySelector('.show_duration');
const trackImage = document.querySelector('.block-left__track-image');
const autoPlay = document.querySelector('.block-right__auto');
const present = document.querySelector('.show-song__present');
const total = document.querySelector('.show-song__total');

let timer;
let autoplay = 0;

let index = 0;
let playingSong = false;

const track = document.createElement('audio');

const allSong = [
  {
    name: 'The ABC song',
    path: 'assets/music/The ABC Song.mp3',
    img: 'assets/images/ABC Song.jpg',
  },
  {
    name: 'I see something blue',
    path: 'assets/music/I See Something Blue.mp3',
    img: 'assets/images/I See Something Blue.jpg',
  },
  {
    name: "If you're happy",
    path: "assets/music/If You're Happy.mp3",
    img: "assets/images/If You're Happy.jpg",
  },
  {
    name: 'One little finger',
    path: 'assets/music/One Little Finger.mp3',
    img: 'assets/images/One Little Finger.jpg',
  },
  {
    name: 'Put on your shoes',
    path: 'assets/music/Put On Your Shoes.mp3',
    img: 'assets/images/Put On Your Shoes.jpg',
  },
  {
    name: 'Rain rain go away',
    path: 'assets/music/Rain Rain Go Away.mp3',
    img: 'assets/images/Rain rain go away.jpg',
  },
  {
    name: 'Ten in a bed',
    path: 'assets/music/Ten in a Bed.mp3',
    img: 'assets/images/Ten in a bed.jpg',
  },
  {
    name: 'The animals on the farm',
    path: 'assets/music/The Animals On The Farm.mp3',
    img: 'assets/images/The animals on the farm.jpg',
  },
  {
    name: 'The greetings song',
    path: 'assets/music/The Greetings Song.mp3',
    img: 'assets/images/The greetings song.jpg',
  },
  {
    name: 'Twinkle twinkle little star',
    path: 'assets/music/Twinkle Twinkle Little Star.mp3',
    img: 'assets/images/Twinkle Twinkle Little Star.jpg',
  },
];
function resetSlider() {
  slider.value = 0;
}

function rangeSlider() {
let position = 0;
if (!isNaN(track.duration)) {
position = track.currentTime * (100 / track.duration);
slider.value = position;
}

if (track.ended) {
play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
if (autoplay == 1) {
  index += 1;
  loadTrack(index);
  playSong();
}
}
}

function loadTrack(number) {
  clearInterval(timer);
  resetSlider();

  track.src = allSong[number].path;
  title.innerHTML = allSong[number].name;
  trackImage.src = allSong[number].img;
  track.load();

  timer = setInterval(rangeSlider, 1000);
  total.innerHTML = allSong.length;
  present.innerHTML = number + 1;
}

loadTrack(index);

function muteSound() {
  track.volume = 0;
  // volume.value = 0;
  volumeShow.innerHTML = 0;
}

function justPlay() {
  if (playingSong === false) {
    playSong();
  } else {
    pauseSong();
  }
}

function playSong() {
  track.play();
  playingSong = true;
  play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
}

function pauseSong() {
  track.pause();
  playingSong = false;
  play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
}

function nextSong() {
  if (index < allSong.length - 1) {
    index += 1;
    loadTrack(index);
    playSong();
  } else {
    index = 0;
    loadTrack(index);
    playSong();
  }
}

function previousSong() {
  if (index > 0) {
    index -= 1;
    loadTrack(index);
    playSong();
  } else {
    index = allSong.length;
    loadTrack(index);
    playSong();
  }
}

function volumeChange() {
  volumeShow.innerHTML = recentVolume.value;
  track.volume = recentVolume.value / 100;
}

function changeDuration() {
  sliderPosition = track.duration * (slider.value / 100);
  track.currentTime = slider_position;
}

function autoPlaySwitch() {
  if (autoplay == 1) {
    autoplay = 0;
    autoPlay.style.background = 'rgba(255,255,255,0.2)';
  } else {
    autoplay = 1;
    autoPlay.style.background = '#FF8A65';
  }
}

volumeIcon.addEventListener('click', muteSound);
recentVolume.addEventListener('change', volumeChange);
previous.addEventListener('click', previousSong);
play.addEventListener('click', justPlay);
next.addEventListener('click', nextSong);
slider.addEventListener('change', changeDuration);
autoPlay.addEventListener('click', autoPlaySwitch);
