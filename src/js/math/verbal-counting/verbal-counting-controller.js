export default class VerbalCountingController {
  #model;

  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.emitter.on('changeAction', (event) => this.changeAction(event))
      .on('changeComplexity', (event) => this.changeComplexity(event))
      .on('clickButtonStart', () => this.start())
      .on('clickButtonCheck', () => this.checkExample())
      .on('changeValueInput', (value) => this.changeValue(value));
  }

  changeAction(event) {
    const target = event.currentTarget;
    const action = +target.getAttribute('data-action');

    this.#model.changeAction(action);
  }

  changeComplexity(event) {
    const target = event.currentTarget;
    const complexity = +target.getAttribute('data-complexity');

    this.#model.changeComplexity(complexity);
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
