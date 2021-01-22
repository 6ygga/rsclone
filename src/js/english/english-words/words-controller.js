const audioWord = new Audio();

export default class GameController {
  construct() {
    this.isGame = false;
    this.init();
  }

  init() {
    this.isGame = false;
    this.countMistakes = 0;
    this.isError = false;
    this.countCards = 8;
    this.allCards = document.querySelectorAll('.card-list__card');
    this.allImageTurn = document.querySelectorAll('.card__imageTurn');
    this.repeatButton = document.querySelector('.repeat-button');
    this.panelAnswer = document.querySelector('.panel-answer');
    this.switcherBlock = document.querySelector('.switcher-block');
    this.switcher = document.querySelector('.switcher');
    this.allCards = document.querySelectorAll('.card-list__card');
    this.gameButton = document.querySelector('.game-button');
    this.audioCorrect = document.querySelector('.audio-correct');
    this.audioError = document.querySelector('.audio-error');
    this.mistakes = document.querySelectorAll('.info-modal');
    this.audioSuccess = document.querySelector('.audio-success');
    this.audioFailure = document.querySelector('.audio-failure');

    this.playSoundCard();
    this.rotateCard();
    this.changeGameMode();
    this.startGame();
  }

  playSoundCard() {
    this.allCards.forEach((elem) => {
      const element = elem;
      element.onclick = () => {
        element.childNodes[2].play();
        /* const statistic = JSON.parse(localStorage.getItem('statistic'));
        for (let i = 0; i < statistic.word.length; i += 1) {
          if (element.childNodes[1].innerText === statistic.word[i]) {
            statistic.click[i] += 1;
          }
        }
        localStorage.setItem('statistic', JSON.stringify(statistic)); */
      };
    });
  }

  rotateCard() {
    this.allImageTurn.forEach((element) => {
      element.addEventListener('click', (event) => {
        event.path[2].classList.add('rotate');
        setTimeout(() => {
          event.path[1].childNodes[0].classList.toggle('card_title-hidden');
          event.path[1].childNodes[1].classList.toggle('card_title-hidden');
          event.path[2].classList.remove('rotate');
        }, 300);
      });
    });
  }

  changeGameMode() {
    /* this.repeatButton.classList.add('game-button__off');
    this.repeatButton.classList.remove('game-button__on');
    this.panelAnswer.classList.add('game-button__off');
    this.panelAnswer.classList.remove('panel-answer__on');
    this.switcher.classList.remove('switcher__on');
    this.switcher.classList.add('switcher__off'); */
    this.switcherBlock.onclick = () => {
      window.getSelection().removeAllRanges();
      if (this.switcher.classList.contains('switcher__off')) {
        this.switcher.childNodes[0].innerText = 'Game';
      } else {
        this.switcher.childNodes[0].innerText = 'Training';
      }
      this.сhangeCardParameters();
      this.isGame = !this.isGame;
    };
  }

  сhangeCardParameters() {
    this.switcher.classList.toggle('switcher__off');
    this.switcher.classList.toggle('switcher__on');
    this.gameButton.classList.toggle('game-button__on');
    this.gameButton.classList.toggle('game-button__off');
    this.allCards.forEach((elem) => {
      const element = elem;
      element.onclick = () => {
        if (this.switcher.classList.contains('switcher__on')) {
          element.onclick = null;
        } else {
          element.childNodes[2].play();
        }
      };
      element.classList.toggle('card__train-mode');
      element.classList.toggle('card__game-mode');
      element.childNodes[1].classList.toggle('card-list__container-none');
      element.childNodes[1].classList.toggle('card-list__container-flex');
      element.childNodes[0].classList.toggle('card_image-game');
    });
  }

  startGame() {
    this.gameButton.addEventListener('click', () => {
      this.switcherBlock.classList.add('game-button__off');
      this.gameButton.classList.remove('game-button__on');
      this.gameButton.classList.add('game-button__off');
      const audioArray = [];
      this.allCards.forEach((element) => {
        audioArray.push(element.childNodes[2].firstElementChild.attributes[0].nodeValue);
      });
      this.shuffle(audioArray);
      this.repeateWord(audioArray);
    });
  }

  repeateWord(audioArray) {
    this.addElementStartGame();
    let currentNumberOfSound = 0;

    audioWord.preload = 'auto';
    audioWord.src = audioArray[currentNumberOfSound];
    audioWord.play();

    this.repeatButton.onclick = () => {
      audioWord.play();
    };

    this.allCards.forEach((elem) => {
      const element = elem;
      element.onclick = () => {
        if (element.childNodes[2].firstElementChild.attributes[0].nodeValue
           === audioArray[currentNumberOfSound]) {
          element.classList.add('card__correct');
          const imgCorrect = new Image(40, 40);
          imgCorrect.src = 'assets/images/common/correct-icon.png';
          currentNumberOfSound += 1;
          audioWord.src = audioArray[currentNumberOfSound];
          setTimeout(() => {
            this.audioCorrect.play();
          }, 200);
          if (currentNumberOfSound < audioArray.length) {
            setTimeout(() => {
              audioWord.play();
            }, 500);
          }
          this.panelAnswer.appendChild(imgCorrect);
          /* const statistic = JSON.parse(localStorage.getItem('statistic'));
          for (let i = 0; i < statistic.word.length; i += 1) {
            if (element.childNodes[1].firstChild.innerText === statistic.word[i]) {
              statistic.correct[i] += 1;
              if (statistic.wrong[i] === 0) {
                statistic.errors[i] = 0;
              } else {
                statistic.errors[i] = ((statistic.wrong[i]
                   / (statistic.correct[i] + statistic.wrong[i])) * 100).toFixed(1);
              }
            }
          }
          localStorage.setItem('statistic', JSON.stringify(statistic)); */
        } else {
          this.isError = true;
          this.countMistakes += 1;
          const imgError = new Image(40, 40);
          imgError.src = 'assets/images/common/error-icon.png';
          setTimeout(() => {
            this.audioError.play();
          }, 200);
          this.panelAnswer.appendChild(imgError);
          /* const statistic = JSON.parse(localStorage.getItem('statistic'));
          for (let i = 0; i < statistic.word.length; i += 1) {
            if (element.childNodes[1].firstChild.innerText === statistic.word[i]) {
              statistic.wrong[i] += 1;
              statistic.errors[i] = ((statistic.wrong[i]
                 / (statistic.correct[i] + statistic.wrong[i])) * 100).toFixed(3);
            }
          }
          localStorage.setItem('statistic', JSON.stringify(statistic)); */
        }
        if (currentNumberOfSound === this.allCards.length) {
          this.endGame();
        }
      };
    });
  }

  addElementStartGame() {
    this.repeatButton.classList.remove('game-button__off');
    this.repeatButton.classList.add('game-button__on');
    this.panelAnswer.classList.remove('game-button__off');
    this.panelAnswer.classList.add('panel-answer__on');
  }

  endGame() {
    const modal = document.querySelector('.success-modal');
    this.isGame = !this.isGame;
    this.mistakes.forEach((count) => {
      const item = count;
      if (this.isError) {
        item.innerText = 'Not bad.\n';
      } else {
        item.innerText = 'Great!\n';
      }
      item.innerText += `You make ${this.countMistakes} mistakes`;
      /* item.innerText += `You learn ${this.countCards - this.countMistakes} words, \n`;
      item.innerText += `${this.countCards - (this.countCards - this.countMistakes)}
      words add to repeat`; */
    });
    if (!this.isError) {
      this.audioSuccess.play();
    } else {
      this.audioFailure.play();
    }
    this.repeatButton.onclick = null;
    modal.classList.remove('finish-modal__close');
    modal.classList.add('finish-modal__open');
    this.clearElementsAfterGame();
  }

  clearElementsAfterGame() {
    setTimeout(() => {
      this.repeatButton.classList.add('game-button__off');
      this.repeatButton.classList.remove('game-button__on');
      this.panelAnswer.classList.add('game-button__off');
      this.panelAnswer.classList.remove('panel-answer__on');
      this.panelAnswer.innerHTML = '';
    }, 2000);
  }

  shuffle(array) {
    let j;
    let temp;
    const arr = array;
    for (let i = arr.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }
}