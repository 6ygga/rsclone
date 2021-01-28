import EventEmitter from '../../event-emitter';

export default class MultiplicationTableModel {
  #emitter;

  constructor() {
    this.#emitter = new EventEmitter();
  }

  get emitter() {
    return this.#emitter;
  }

  // method() {
  //   this.#emitter.emit('');
  // }
}
