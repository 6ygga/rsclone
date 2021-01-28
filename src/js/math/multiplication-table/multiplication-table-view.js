import EventEmitter from '../../event-emitter';

export default class MultiplicationTableView {
  #model;

  #emitter;

  // eslint-disable-next-line no-unused-vars
  constructor(model, elements) {
    this.#model = model;
    this.#emitter = new EventEmitter();

    // this.#model.emitter.on('', () => this.method());

    // elements.element.addEventListener('', () => this.#emitter.emit('method'));
  }

  get emitter() {
    return this.#emitter;
  }

  // method() { }
}
