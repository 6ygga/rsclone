import EventEmitter from '../../event-emitter';
import shuffleArray from '../../shuffle-array';
import { Actions, Complexity } from '../../constants/math-simulators';

export default class VerbalCountingModel {
  #emitter;

  #action;

  #currentAction;

  #complexity;

  #listExamples;

  #countExamples;

  #currentExample;

  #result;

  #responseLog;

  #progress;

  constructor() {
    this.#emitter = new EventEmitter();
    // eslint-disable-next-line prefer-destructuring
    this.#action = Actions[0];
    this.#currentAction = this.#action;
    // eslint-disable-next-line prefer-destructuring
    this.#complexity = Complexity[0];
    this.#listExamples = VerbalCountingModel.createListOfExamples(this.#action, this.#complexity);
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

  get complexity() {
    return this.#complexity;
  }

  get action() {
    return this.#action;
  }

  get currentAction() {
    return this.#currentAction;
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
    this.#currentAction = this.#action;
    this.#listExamples = VerbalCountingModel.createListOfExamples(this.#action, this.#complexity);
    this.#countExamples = this.#listExamples.length;
    this.#responseLog = [];

    this.changeExample();
    this.changeProgress();
    this.changeResult('');

    this.#emitter.emit('changeResponseLogs');
  }

  checkExample() {
    const solution = this.getSolution();
    const correct = solution === +this.#result;

    this.changeProgress();
    this.writeResponseLogs(correct, this.#currentExample, solution, this.#result);
    this.changeExample();
    this.changeResult('');
  }

  getSolution() {
    switch (this.#currentAction) {
      case Actions[0]: return this.#currentExample[0] + this.#currentExample[1];
      case Actions[1]: return this.#currentExample[0] - this.#currentExample[1];
      case Actions[2]: return this.#currentExample[0] * this.#currentExample[1];
      case Actions[3]: return this.#currentExample[0] / this.#currentExample[1];
      default: break;
    }

    return 0;
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

  changeAction(action) {
    this.#action = action;

    this.#emitter.emit('changeAction');
  }

  changeComplexity(complexity) {
    this.#complexity = complexity;

    this.#emitter.emit('changeComplexity');
  }

  static createListOfExamples(action, complexity) {
    let list = [];

    if (action === Actions[3]) {
      while (list.length <= 16) {
        const args = VerbalCountingModel.getArguments(complexity);
        if (args[0] % args[1] === 0 && args[1] !== 1) list.push(args);
      }
    } else {
      list = Array(16).fill(null).map(() => VerbalCountingModel.getArguments(complexity));
    }

    return shuffleArray(list);
  }

  static getArguments(complexity) {
    const limit1 = 10 ** Math.ceil(complexity / 2);
    const limit2 = 10 ** Math.floor(complexity / 2);
    const arg1 = VerbalCountingModel.randomInteger(limit1 / 10, limit1);
    const arg2 = VerbalCountingModel.randomInteger(limit2 / 10, limit2);

    return [Math.max(arg1, arg2), Math.min(arg1, arg2)];
  }

  static randomInteger(min, max) {
    const rand = min + Math.random() * (max - min);
    return Math.floor(rand);
  }
}
