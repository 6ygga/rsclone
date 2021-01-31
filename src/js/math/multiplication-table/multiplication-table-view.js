import EventEmitter from '../../event-emitter';
import createDOMElement from '../../create-dom-element';

export default class MultiplicationTableView {
  #model;

  #emitter;

  #elements;

  constructor(model, elements) {
    this.#model = model;
    this.#emitter = new EventEmitter();
    this.#elements = elements;

    this.#model.emitter.on('changeTableRange', () => this.changeRange())
      .on('changeResponseLogs', () => this.changeTableResults())
      .on('changeExample', () => this.changeExample())
      .on('changeProgress', () => this.changeProgressBar())
      .on('changeResult', () => this.changeResult());

    this.#elements.buttonGroupSetting.forEach((button) => button
      .addEventListener('click', (event) => this.#emitter.emit('changeRange', event)));
    this.#elements.buttonStart.addEventListener('click', () => this.clickButtonStart());
    this.#elements.buttonCheck.addEventListener('click', () => this.clickButtonCheck());
    this.#elements.result.addEventListener('input', (event) => this.changeInput(event));
    this.#elements.buttonsNumber.forEach((button) => button
      .addEventListener('click', (event) => this.clickButtonNumber(event)));
  }

  get emitter() {
    return this.#emitter;
  }

  show() {
    this.changeRange();
    this.changeTableResults();
    this.changeExample();
    this.changeProgressBar();
  }

  changeRange() {
    this.#elements.buttonGroupSetting.forEach((button) => {
      const number = +button.getAttribute('data-number');

      if (this.#model.range.includes(number)) {
        button.setAttribute('data-check', 'true');
      } else {
        button.setAttribute('data-check', '');
      }
    });
  }

  changeTableResults() {
    const logs = Array.from(this.#model.responseLog).reverse();
    const { table } = this.#elements;
    const thead = [table.children[0], table.children[1], table.children[2]];

    while (table.firstChild) table.removeChild(table.firstChild);
    thead.forEach((item) => table.appendChild(item));

    logs.forEach((item) => {
      const dataCorrect = item.correct ? 'true' : '';
      const example = createDOMElement(
        'div',
        { class: 'block-table-result__table_column', 'data-correct': dataCorrect },
        `${item.args[0]} ${String.fromCharCode(215)} ${item.args[1]}`,
      );
      const solution = createDOMElement(
        'div',
        { class: 'block-table-result__table_column', 'data-correct': dataCorrect },
        `${item.solution}`,
      );
      const response = createDOMElement(
        'div',
        { class: 'block-table-result__table_column', 'data-correct': dataCorrect },
        `${item.response}`,
      );

      table.appendChild(example);
      table.appendChild(solution);
      table.appendChild(response);
    });
  }

  changeExample() {
    const multiplicand = this.#model.example[0];
    const multiplier = this.#model.example[1];

    this.#elements.multiplicand.innerText = multiplicand;
    this.#elements.multiplier.innerText = multiplier;
  }

  changeProgressBar() {
    const { progress } = this.#model;

    this.#elements.progressBar.style.width = `${progress}%`;
  }

  changeResult() {
    const value = this.#model.result;

    this.#elements.result.value = value;
  }

  clickButtonStart() {
    this.#emitter.emit('clickButtonStart');
    this.#elements.result.focus();
  }

  clickButtonCheck() {
    this.#emitter.emit('clickButtonCheck');
    this.#elements.result.focus();
  }

  changeInput(event) {
    event.currentTarget.value = event.currentTarget.value.replace(/[^\d]/g, '');
    this.#emitter.emit('changeValueInput', event.currentTarget.value);
  }

  clickButtonNumber(event) {
    const currentValue = this.#elements.result.value;

    if (currentValue.length === 2) return;

    const value = `${currentValue}${event.currentTarget.innerText}`;
    this.#emitter.emit('changeValueInput', value);
  }
}
