export default class MultiplicationTableController {
  #model;

  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.emitter.on('changeRange', (event) => this.changeRange(event))
      .on('clickButtonStart', () => this.start())
      .on('clickButtonCheck', () => this.checkExample())
      .on('changeValueInput', (value) => this.changeValue(value));
  }

  changeRange(event) {
    const target = event.currentTarget;
    const number = +target.getAttribute('data-number');
    const check = Boolean(target.getAttribute('data-check'));

    this.#model.changeTableRange(number, check);
  }

  start() {
    this.#model.start();
  }

  checkExample() {
    this.#model.checkExample();
  }

  changeValue(value) {
    this.#model.changeResult(value);
  }
}
