import EventEmitter from '../event-emitter';

export default class EnglishMathAppModel {
  #route;

  #emitter;

  constructor() {
    this.#route = null;
    this.#emitter = new EventEmitter();
  }

  get route() {
    return this.#route;
  }

  get emitter() {
    return this.#emitter;
  }

  changeRoute(route) {
    this.#route = route;

    this.#emitter.emit('changePage');
  }
}
