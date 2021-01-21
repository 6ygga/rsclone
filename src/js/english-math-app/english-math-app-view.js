import EventEmitter from '../event-emitter';
import MathMain from '../math/math-main';
import Fractions from '../math/fractions/fractions';
import MultiplicationTable from '../math/multiplication-table/multiplication-table';
import TimeGame from '../math/time-game/time-game';
import VerbalCounting from '../math/verbal-counting/verbal-counting';
import {
  MATH,
  FRACTIONS,
  MULTIPLICATION_TABLE,
  TIME_GAME,
  VERBAL_COUNTING,
} from '../constants/routes';

export default class EnglishMathAppView {
  #model;

  #emitter;

  constructor(model) {
    this.#model = model;
    this.#emitter = new EventEmitter();

    this.#model.emitter.on('changePage', () => this.changePage());

    window.addEventListener('hashchange', (event) => this.#emitter.emit('changePage', event));
  }

  get emitter() {
    return this.#emitter;
  }

  changePage() {
    switch (this.#model.route) {
      case MATH: this.render(MathMain.createPage());
        break;
      case FRACTIONS: this.render(Fractions.createPage());
        break;
      case MULTIPLICATION_TABLE: this.render(MultiplicationTable.createPage());
        break;
      case TIME_GAME: this.render(TimeGame.createPage());
        break;
      case VERBAL_COUNTING: this.render(VerbalCounting.createPage());
        break;
      default: break;
    }
  }

  render(page) {
    const main = document.querySelector('main');

    while (main.firstChild) main.removeChild(main.firstChild);

    main.appendChild(page);
  }
}
