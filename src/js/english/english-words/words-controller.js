const audioWord = new Audio();

export default class GameController {
  construct() {
    this.isGame = false;
    this.init();
  }

  init() {
    this.isGame = false;
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
    this.mistakes = document.querySelectorAll('.mistakes-modal');
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
          event.path[1].childNodes[0].classList.add('card_title-hidden');
          event.path[1].childNodes[1].classList.remove('card_title-hidden');
          event.path[2].classList.remove('rotate');
        }, 100);
        setTimeout(() => {
          event.path[1].childNodes[0].classList.add('russianTitle');
        }, 150);
      });
      // const allCards = document.querySelectorAll(".card-list__card");
      this.allCards.forEach((item) => {
        item.addEventListener('mouseleave', () => {
          if (item.childNodes[1].childNodes[0].classList.contains('russianTitle')) {
            item.classList.add('rotate');
            setTimeout(() => {
              item.childNodes[1].childNodes[1].classList.add('card_title-hidden');
              item.childNodes[1].childNodes[0].classList.remove('card_title-hidden');
              item.childNodes[1].childNodes[0].classList.remove('russianTitle');
              item.classList.remove('rotate');
            }, 200);
          }
        });
      });
    });
  }

  changeGameMode() {
    this.repeatButton.classList.add('game-button__off');
    this.repeatButton.classList.remove('game-button__on');
    this.panelAnswer.classList.add('game-button__off');
    this.panelAnswer.classList.remove('panel-answer__on');

    this.switcher.classList.remove('switcher__on');
    this.switcher.classList.add('switcher__off');
    this.switcherBlock.onclick = () => {
      if (location.hash === '#Menu') return;
      if (this.switcher.classList.contains('switcher__off')) {
        this.switcher.classList.remove('switcher__off');
        this.switcher.classList.add('switcher__on');
        this.gameButton.classList.add('game-button__on');
        this.gameButton.classList.remove('game-button__off');
        this.allCards.forEach((elem) => {
          const element = elem;
          element.onclick = null;
          element.classList.add('card__game-mode');
          element.classList.remove('card__train-mode');
          element.childNodes[1].classList.add('card-list__container-none');
          element.childNodes[1].classList.remove('card-list__container-flex');
          element.childNodes[0].classList.add('card_image-game');
        });
      } else {
        this.switcher.classList.add('switcher__off');
        this.switcher.classList.remove('switcher__on');
        this.gameButton.classList.remove('game-button__on');
        this.gameButton.classList.add('game-button__off');
        this.allCards.forEach((elem) => {
          const element = elem;
          element.onclick = () => {
            element.childNodes[2].play();
          };
          element.classList.add('card__train-mode');
          element.classList.remove('card__game-mode');
          element.childNodes[1].classList.remove('card-list__container-none');
          element.childNodes[1].classList.add('card-list__container-flex');
          element.childNodes[0].classList.remove('card_image-game');
        });
      }
      this.isGame = !this.isGame;
    };
  }

  startGame() {
    this.gameButton.addEventListener('click', () => {
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
    this.repeatButton.classList.remove('game-button__off');
    this.repeatButton.classList.add('game-button__on');
    this.panelAnswer.classList.remove('game-button__off');
    this.panelAnswer.classList.add('panel-answer__on');

    let currentNumberOfSound = 0;
    let mistake = 0;
    let isError = false;
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
          imgCorrect.src = 'assets/images/common/star-win.svg';
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
          isError = true;
          mistake += 1;
          const imgError = new Image(40, 40);
          imgError.src = 'assets/images/common/star.svg';
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
          let modal;
          this.mistakes.forEach((count) => {
            const item = count;
            item.innerText = `${mistake} mistakes`;
          });
          if (!isError) {
            // const audioSuccess = document.querySelector(".audio-success");
            this.audioSuccess.play();
            modal = document.querySelector('.success-modal');
          } else {
            // const audioFailure = document.querySelector(".audio-failure");
            this.audioFailure.play();
            modal = document.querySelector('.error-modal');
          }
          this.repeatButton.onclick = null;
          modal.classList.remove('finish-modal__close');
          modal.classList.add('finish-modal__open');
          setTimeout(() => {
            modal.classList.add('finish-modal__close');
            this.repeatButton.classList.add('game-button__off');
            this.repeatButton.classList.remove('game-button__on');
            this.panelAnswer.classList.add('game-button__off');
            this.panelAnswer.classList.remove('panel-answer__on');
            this.panelAnswer.innerHTML = '';
            modal.classList.remove('finish-modal__open');
          }, 2000);
          setTimeout(() => {
            window.location = '';
          }, 2000);
          this.isGame = !this.isGame;
        }
      };
    });
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
