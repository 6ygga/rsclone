import EventEmitter from '../event-emitter';

export default class EnglishMathAppView {
  #emitter;

  constructor(model) {
    this.#emitter = new EventEmitter();

    model.emitter.on('changePage', () => this.changePage());

    window.addEventListener('hashchange', (event) => {
      // eslint-disable-next-line no-console
      console.log(event);
    });
  }

  get emitter() {
    return this.#emitter;
  }

  changePage() {

  }
}
