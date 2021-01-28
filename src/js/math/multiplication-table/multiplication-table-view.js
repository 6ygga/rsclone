import EventEmitter from '../../event-emitter';

export default class MultiplicationTableView {
  #model;

  #emitter;

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
