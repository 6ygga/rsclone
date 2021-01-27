import allSong from './music-data';

export default class englishMusicController {
  constructor() {
    this.previous = document.querySelector('.panel__pre');
    this.play = document.querySelector('.panel__play');
    this.next = document.querySelector('.panel__next');
    this.title = document.querySelector('.block-right__song-title');
    this.recentVolume = document.querySelector('#volume');
    this.volumeShow = document.querySelector('.volume__show');
    this.volumeIcon = document.querySelector('.volume__icon');
    this.slider = document.querySelector('.duration__slider');
    this.canvasElement = document.getElementById('canvas__visual');
    this.trackImage = document.querySelector('.block-right__track-image');
    this.autoPlay = document.querySelector('.block-right__auto');
    this.present = document.querySelector('.show-song__present');
    this.total = document.querySelector('.show-song__total');

    this.mute = false;
    this.timer = null;
    this.autoplay = 0;
    this.index = 0;
    this.playingSong = false;
    this.track = document.createElement('audio');

    this.audioContext = null;
  }

  createVisualiser() {
    this.audioContext = new AudioContext();
    const src = this.audioContext.createMediaElementSource(this.track);
    const analyser = this.audioContext.createAnalyser();
    const canvas = this.canvasElement;
    const ctx = canvas.getContext('2d');
    src.connect(analyser);
    analyser.connect(this.audioContext.destination);
    analyser.fftSize = 128;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = (canvas.width / bufferLength) * 2.5;

    function renderFrame() {
      requestAnimationFrame(renderFrame);
      let bar = 0;
      analyser.getByteFrequencyData(dataArray);
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < bufferLength; i += 1) {
        const barHeight = dataArray[i] - 75;
        const r = barHeight + (25 * (i / bufferLength));
        ctx.fillStyle = `rgb(${r}, 0, 255)`;
        ctx.fillRect(bar, canvas.height - barHeight, barWidth, barHeight);
        bar += barWidth + 2;
      }
    }
    renderFrame();
  }

  resetSlider() {
    this.slider.value = 0;
  }

  loadTrack(number) {
    clearInterval(this.timer);
    this.resetSlider();

    this.track.src = allSong[number].path;
    this.title.innerHTML = allSong[number].name;
    this.trackImage.src = allSong[number].img;
    this.track.load();
    this.timer = setInterval(this.rangeSlider.bind(this), 1000);
    this.total.innerHTML = allSong.length;
    this.present.innerHTML = number + 1;
  }

  playSong() {
    if (!this.audioContext) {
      this.createVisualiser();
    }
    this.track.play();
    this.playingSong = true;
    this.play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
  }

  rangeSlider() {
    let position = 0;
    if (!isNaN(this.track.duration)) {
      position = this.track.currentTime * (100 / this.track.duration);
      this.slider.value = position;
    }

    if (this.track.ended) {
      this.play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
      if (this.autoplay === 1) {
        if (this.index !== 9) {
          this.index += 1;
        } else {
          this.index = 0;
        }
        this.loadTrack(this.index);
        this.playSong();
      }
    }
  }

  muteSound() {
    this.mute = !this.mute;
    if (this.mute) {
      localStorage.setItem('volume', this.track.volume);
      this.track.volume = 0;
      this.volumeShow.innerHTML = 0;
      this.volumeIcon.classList.remove('fa-volume-up');
      this.volumeIcon.classList.add('fa-volume-off');
    } else {
      this.track.volume = localStorage.getItem('volume');
      this.volumeShow.innerHTML = this.track.volume * 100;
      this.volumeIcon.classList.add('fa-volume-up');
      this.volumeIcon.classList.remove('fa-volume-off');
    }
  }

  pauseSong() {
    this.track.pause();
    this.playingSong = false;
    this.play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
  }

  justPlay() {
    if (this.playingSong === false) {
      this.playSong();
    } else {
      this.pauseSong();
    }
  }

  nextSong() {
    if (this.index < allSong.length - 1) {
      this.index += 1;
      this.loadTrack(this.index);
      this.playSong();
    } else {
      this.index = 0;
      this.loadTrack(this.index);
      this.playSong();
    }
  }

  previousSong() {
    if (this.index > 0) {
      this.index -= 1;
      this.loadTrack(this.index);
      this.playSong();
    } else {
      this.index = allSong.length - 1;
      this.loadTrack(this.index);
      this.playSong();
    }
  }

  volumeChange() {
    this.mute = false;
    this.volumeShow.innerHTML = this.recentVolume.value;
    this.track.volume = this.recentVolume.value / 100;
  }

  changeDuration() {
    const sliderPosition = this.track.duration * (this.slider.value / 100);
    this.track.currentTime = sliderPosition;
  }

  autoPlaySwitch() {
    if (this.autoplay === 1) {
      this.autoplay = 0;
      this.autoPlay.style.background = 'rgba(255,255,255,0.2)';
    } else {
      this.autoplay = 1;
      this.autoPlay.style.background = '#FF8A65';
    }
  }

  init() {
    this.volumeIcon.addEventListener('click', this.muteSound.bind(this));
    this.recentVolume.addEventListener('change', this.volumeChange.bind(this));
    this.previous.addEventListener('click', this.previousSong.bind(this));
    this.play.addEventListener('click', this.justPlay.bind(this));
    this.next.addEventListener('click', this.nextSong.bind(this));
    this.slider.addEventListener('change', this.changeDuration.bind(this));
    this.autoPlay.addEventListener('click', this.autoPlaySwitch.bind(this));
    this.loadTrack(this.index);
  }
}
