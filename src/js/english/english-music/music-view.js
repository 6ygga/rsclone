import EnglishMusicController from './music-controller';

export default class EnglishMusic {
  constructor() {
    this.musicContainer = null;
  }

  initContainer() {
    this.musicContainer = document.createElement('div');
    this.musicContainer.classList.add('musicContainer');
    this.initAllElement();
  }

  createPage() {
    this.initContainer();
    return this.musicContainer;
  }

  initAllElement() {
    this.createLogo();
    this.createLeftBlock();
    this.createRightBlock();
    setTimeout(() => {
      const englishMusicController = new EnglishMusicController();
      englishMusicController.init();
    }, 500);
  }

  createLogo() {
    this.logo = document.createElement('p');
    this.logo.classList.add('musicContainer__logo');
    this.logo.innerHTML = '<i class="fa fa-music" aria-hidden="true"> Top 10 English songs for kids</i>';
    this.musicContainer.appendChild(this.logo);
  }

  createLeftBlock() {
    this.leftBlock = document.createElement('div');
    this.leftBlock.classList.add('musicContainer__block-left');
    this.leftBlock.innerHTML = `
      <div class ='block-left__canvas'>
        <canvas id="canvas__visual"></canvas>
      </div>
      <div class = 'block-left__volume'>
      <p class = 'volume__show'>100</p>
      <i class="fa fa-volume-up volume__icon" aria-hidden="true"></i>
      <input type = 'range' min = '0' max = '100' value = '100' id = 'volume'>
      </div>
    `;
    this.musicContainer.appendChild(this.leftBlock);
  }

  createRightBlock() {
    this.rightBlock = document.createElement('div');
    this.rightBlock.classList.add('musicContainer__block-right');
    this.rightBlock.innerHTML = `
      <div class = 'block-right__show-song'>
        <p class = 'show-song__present'>1</p>
        <p>/</p>
        <p class = 'show-song__total'>10</p>
      </div>
      <p class = 'block-right__song-title'>title.mp3</p>
      <img class = 'block-right__track-image'>
      <div class = 'block-right__panel'>
        <button class = 'panel__pre'> <i class="fa fa-step-backward" aria-hidden="true"></i></button>
        <button class = 'panel__play'><i class="fa fa-play" aria-hidden="true"></i></button>
        <button class = 'panel__next'><i class="fa fa-step-forward" aria-hidden="true"></i></button>
      </div>
      <div class = 'block-right__duration'>
        <input type = 'range' min = '0' max = '100' value = '0' class = 'duration__slider'>
      </div>
      <button class = 'block-right__auto'>Auto play <i class="fa fa-circle-o-notch" aria-hidden="true"></i></button>
    `;
    this.musicContainer.appendChild(this.rightBlock);
  }
}
