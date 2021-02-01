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
    this.#emitter = new EventEmitter();
    this.#tableRange = [2];
    this.#listExamples = MultiplicationTableModel.createListOfExamples(this.#tableRange);
    this.#countExamples = this.#listExamples.length;
    this.#responseLog = [];
    this.#result = '';
    this.#currentExample = this.#listExamples.pop();
    this.#progress = 100 - Math.ceil((100 / this.#countExamples) * this.#listExamples.length);
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
}
