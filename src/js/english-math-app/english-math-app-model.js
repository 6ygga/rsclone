import EventEmitter from '../event-emitter';
import {
  Math,
  // Fractions,
  // MultiplicationTable,
  // TimeGame,
  // VerbalCounting,
} from '../constants/routes';

export default class EnglishMathAppModel {
  #route;

  #emitter;

  constructor() {
    this.#route = Math;
    this.#emitter = new EventEmitter();
  }

  get emitter() {
    return this.#emitter;
  }

  changeRoute() {
    this.#emitter.emit('changePage');
  }
}
