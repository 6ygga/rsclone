import EventEmitter from '../../event-emitter';
import shuffleArray from '../../shuffle-array';

export default class MultiplicationTableModel {
  #emitter;

  #tableRange;

  #listExamples;

  #countExamples;

  #currentExample;

  #result;

  #responseLog;

  #progress;

  constructor() {
    const save = this.readeLocaleStorage();

    this.#emitter = new EventEmitter();
    this.#tableRange = save.tableRange || [2];
    this.#listExamples = save.listExamples
      || MultiplicationTableModel.createListOfExamples(this.#tableRange);
    this.#countExamples = save.countExamples || this.#listExamples.length;
    this.#responseLog = save.responseLog || [];
    this.#result = save.result || '';
    this.#currentExample = save.currentExample || this.#listExamples.pop();
    this.#progress = save.progress
      || (100 - Math.ceil((100 / this.#countExamples) * this.#listExamples.length));

    window.addEventListener('unload', () => {
      const currentURL = document.URL.split('/').pop();
      if (currentURL === 'multiplication-table') this.writeLocaleStorage();
    });
    window.addEventListener('hashchange', (event) => {
      const oldURL = event.oldURL.split('/').pop();
      if (oldURL === 'multiplication-table') this.writeLocaleStorage();
    });
  }

  get emitter() {
    return this.#emitter;
  }

  get example() {
    return this.#currentExample;
  }

  get range() {
    return this.#tableRange;
  }

  get progress() {
    return this.#progress;
  }

  get result() {
    return this.#result;
  }

  get responseLog() {
    return this.#responseLog;
  }

  start() {
    this.#listExamples = MultiplicationTableModel.createListOfExamples(this.#tableRange);
    this.#countExamples = this.#listExamples.length;
    this.#responseLog = [];

    this.changeExample();
    this.changeProgress();
    this.changeResult('');

    this.#emitter.emit('changeResponseLogs');
  }

  checkExample() {
    const solution = this.#currentExample[0] * this.#currentExample[1];
    const correct = solution === +this.#result;

    this.changeProgress();
    this.writeResponseLogs(correct, this.#currentExample, solution, this.#result);
    this.changeExample();
    this.changeResult('');
  }

  writeResponseLogs(correct, args, solution, response) {
    if (this.#countExamples === this.#responseLog.length) return;

    this.responseLog.push({
      correct,
      args,
      solution,
      response,
    });

    this.#emitter.emit('changeResponseLogs');
  }

  changeExample() {
    if (!this.#listExamples.length) return;

    this.#currentExample = this.#listExamples.pop();

    this.#emitter.emit('changeExample');
  }

  changeProgress() {
    this.#progress = 100 - Math.ceil((100 / this.#countExamples) * this.#listExamples.length);

    this.#emitter.emit('changeProgress');
  }

  changeResult(value) {
    this.#result = value;

    this.#emitter.emit('changeResult');
  }

  changeTableRange(number, check) {
    if (check && this.#tableRange.length === 1) return;

    if (!check) {
      this.#tableRange.push(number);
    } else {
      this.#tableRange = this.#tableRange.filter((item) => item !== number);
    }

    this.#emitter.emit('changeTableRange');
  }

  static createListOfExamples(range) {
    const list = [];

    for (let index = 0; index < range.length; index += 1) {
      for (let number = 2; number < 10; number += 1) {
        list.push([[range[index]], [number]]);
      }
    }

    return shuffleArray(list);
  }

  writeLocaleStorage() {
    const objForSave = {
      tableRange: this.#tableRange,
      listExamples: this.#listExamples,
      countExamples: this.#countExamples,
      currentExample: this.#currentExample,
      result: this.#result,
      responseLog: this.#responseLog,
      progress: this.#progress,
    };

    localStorage.removeItem('mathMultiplicationTable');
    localStorage.setItem('mathMultiplicationTable', JSON.stringify(objForSave));
  }

  readeLocaleStorage() {
    const save = JSON.parse(localStorage.getItem('mathMultiplicationTable'));

    if (save) return save;

    return {
      tableRange: null,
      listExamples: null,
      countExamples: null,
      currentExample: null,
      result: null,
      responseLog: null,
      progress: null,
    };
  }
}
