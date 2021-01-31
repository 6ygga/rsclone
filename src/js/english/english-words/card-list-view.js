import Card from './card-view';
// import words from './words-data';
import GameController from './words-controller';
// import categories from './categories-data';

export default class CardList {
  constructor() {
    this.count = 0;
    this.cards = [];
    this.element = null;
    this.countCards = 8;
    this.createWrapper();
    this.createSwitcher();
    this.createPanelAnswer();
    this.createCardBlock();
    this.createStarGameButton();
    this.createRepeatButton();
    this.createAudio();
    this.createModal();
  }

  createWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('wrapper__card-list');
  }

  createCardBlock() {
    this.element = document.createElement('ul');
    this.element.classList.add('card-list');
    this.wrapper.appendChild(this.element);
  }

  createPage() {
    return this.wrapper;
  }

  createSwitcher() {
    this.switcherBlock = document.createElement('div');
    const switcher = document.createElement('div');
    const info = document.createElement('span');
    this.switcherBlock.classList.add('switcher-block');
    this.switcherBlock.classList.add('game-button__off');
    switcher.classList.add('switcher');
    switcher.classList.add('switcher__off');
    info.innerText = 'Training';
    info.classList.add('switcher__info');
    this.switcherBlock.appendChild(switcher);
    switcher.appendChild(info);
    this.wrapper.appendChild(this.switcherBlock);
  }

  render(model) {
    if (this.cards.length !== 0) {
      this.cards = [];
    }
    const table = document.querySelector('.table-container');
    if (table !== null) {
      document.querySelector('.wrapper__card-list').removeChild(document.querySelector('.wrapper__card-list').lastChild);
    }
    document.querySelector('.card-list').innerHTML = '';
    /* const switcher = document.querySelector('.switcher');
    switcher.classList.remove('switcher__on');
    switcher.classList.add('switcher__off'); */
    if (model.length > this.countCards) {
      this.shuffle(model);
      this.switcherBlock.classList.remove('game-button__off');
    }

    for (let i = 0; i < this.countCards; i += 1) {
      this.cards.push(new Card(this, model[i], i));
    }
    setTimeout(() => {
      const gameController = new GameController();
      gameController.init();
    }, 500);
  }

  /* personClick() {
    if (!this.count) {
      document.querySelector('.card-list').childNodes[0].addEventListener('click', () => {
        this.count += 1;
        this.render(words.сharacteristics);
      });
    }
  } */

  createStarGameButton() {
    this.gameButton = document.createElement('div');
    const nameButton = document.createElement('span');
    nameButton.innerText = 'Start Game';
    this.gameButton.classList.add('game-button');
    this.gameButton.classList.add('game-button__off');
    this.wrapper.appendChild(this.gameButton);
    this.gameButton.appendChild(nameButton);
  }

  createRepeatButton() {
    this.gameButton = document.createElement('div');
    const nameButton = document.createElement('span');
    nameButton.innerText = 'Repeat';
    this.gameButton.classList.add('repeat-button');
    this.gameButton.classList.add('game-button__off');
    this.wrapper.appendChild(this.gameButton);
    this.gameButton.appendChild(nameButton);
  }

  createAudio() {
    const audioCorrect = document.createElement('audio');
    const audioError = document.createElement('audio');
    const audioSuccess = document.createElement('audio');
    const audioFailure = document.createElement('audio');

    audioCorrect.classList.add('audio-correct');
    audioError.classList.add('audio-error');
    audioSuccess.classList.add('audio-success');
    audioFailure.classList.add('audio-failure');

    audioCorrect.innerHTML = '<source src="assets/music/common/correct.mp3" type="audio/mpeg">';
    audioError.innerHTML = '<source src="assets/music/common/error.mp3" type="audio/mpeg">';
    audioSuccess.innerHTML = '<source src="assets/music/common/success.mp3" type="audio/mpeg">';
    audioFailure.innerHTML = '<source src="assets/music/common/failure.mp3" type="audio/mpeg">';

    this.wrapper.appendChild(audioCorrect);
    this.wrapper.appendChild(audioError);
    this.wrapper.appendChild(audioSuccess);
    this.wrapper.appendChild(audioFailure);
  }

  createPanelAnswer() {
    const panelAnswer = document.createElement('div');
    panelAnswer.classList.add('game-button__off');
    panelAnswer.classList.add('panel-answer');
    this.wrapper.appendChild(panelAnswer);
  }

  createModal() {
    if (document.querySelector('.success-modal') != null) {
      return;
    }
    const modal = document.createElement('div');
    modal.classList.add('finish-modal__close');
    modal.classList.add('success-modal');
    document.querySelector('body').appendChild(modal);
    const close = document.createElement('a');
    close.href = '/#/english/words';
    close.innerHTML = '&times;';
    close.classList.add('close-modal');
    const info = document.createElement('p');
    info.classList.add('info-modal');
    modal.appendChild(close);
    modal.appendChild(info);
    /* eslint-disable-next-line */
    close.onclick = function () {
      modal.classList.remove('finish-modal__open');
      modal.classList.add('finish-modal__close-click');
      // this.render(categories);
    };
  }

  shuffle(arr) {
    let j;
    let temp;
    for (let i = arr.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }
}
