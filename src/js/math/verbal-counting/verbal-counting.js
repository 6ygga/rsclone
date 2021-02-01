import createDOMElement from '../../create-dom-element';
import { TableResultNameCol, Actions, Complexity } from '../../constants/math-simulators';
import VerbalCountingModel from './verbal-counting-model';
import VerbalCountingView from './verbal-counting-view';
import VerbalCountingController from './verbal-counting-controller';
import MathMain from '../math-main';

export default class VerbalCounting {
  static leftArgument;

  static rightArgument;

  static action;

  static result;

  static buttonCheck;

  static buttonsNumber;

  static table;

  static buttonStart;

  static actionButtons;

  static complexityButtons;

  static progressBar;

  static initialize() {
    const model = new VerbalCountingModel();
    const view = new VerbalCountingView(model, {
      leftArgument: VerbalCounting.leftArgument,
      rightArgument: VerbalCounting.rightArgument,
      action: VerbalCounting.action,
      result: VerbalCounting.result,
      buttonCheck: VerbalCounting.buttonCheck,
      buttonsNumber: VerbalCounting.buttonsNumber,
      table: VerbalCounting.table,
      buttonStart: VerbalCounting.buttonStart,
      actionButtons: VerbalCounting.actionButtons,
      complexityButtons: VerbalCounting.complexityButtons,
      progressBar: VerbalCounting.progressBar,
    });
    // eslint-disable-next-line no-unused-vars
    const controller = new VerbalCountingController(model, view);

    view.show();
  }

  static createPage() {
    const { blockButtons, buttonCheck, buttonsNumber } = MathMain.createBlockButtons();
    const blockSetting = VerbalCounting.createBlockSetting();
    const blockCalculation = VerbalCounting.createBlockCalculation();
    const { blockTableResult, table } = MathMain.createBlockTableResult(TableResultNameCol);
    const blockProgress = VerbalCounting.createBlockProgress();
    const verbalCounting = createDOMElement(
      'section',
      { class: 'verbal-counting' },
      blockSetting,
      blockButtons,
      blockCalculation,
      blockTableResult,
      blockProgress,
    );

    VerbalCounting.buttonCheck = buttonCheck;
    VerbalCounting.buttonsNumber = buttonsNumber;
    VerbalCounting.table = table;
    VerbalCounting.initialize();

    return verbalCounting;
  }

  static createBlockSetting() {
    const actionButtons = Actions.map((item) => createDOMElement(
      'button',
      { type: 'button', 'data-check': 'true', 'data-action': `${item}` },
      document.createTextNode(String.fromCharCode(item)),
    ));
    const actions = createDOMElement(
      'div',
      { class: 'block-setting__button-group', role: 'group' },
      ...actionButtons,
    );
    const complexityButtons = Complexity.map((item) => createDOMElement(
      'button',
      { type: 'button', 'data-check': 'true', 'data-complexity': `${item}` },
      `${item}`,
    ));
    const complexity = createDOMElement(
      'div',
      { class: 'block-setting__button-group', role: 'group' },
      ...complexityButtons,
    );
    const buttonStart = createDOMElement('button', { class: 'block-setting__button-start' }, 'Старт');
    const setting = createDOMElement('div', { class: 'block-setting' }, actions, complexity, buttonStart);

    VerbalCounting.actionButtons = actionButtons;
    VerbalCounting.complexityButtons = complexityButtons;
    VerbalCounting.buttonStart = buttonStart;

    return setting;
  }

  static createBlockCalculation() {
    const action = createDOMElement('span', {}, document
      .createTextNode(String.fromCharCode(Actions[0])));
    const equals = createDOMElement('span', {}, document.createTextNode(String.fromCharCode(61)));
    const leftArgument = createDOMElement('span', { class: 'block-calculation__argument' }, '0');
    const rightArgument = createDOMElement('span', { class: 'block-calculation__argument' }, '0');
    const result = createDOMElement(
      'input',
      {
        class: 'block-calculation__result', type: 'text', maxLength: '5', placeholder: '?',
      },
    );
    const blockCalculation = createDOMElement(
      'div',
      { class: 'block-calculation' },
      leftArgument,
      action,
      rightArgument,
      equals,
      result,
    );

    VerbalCounting.leftArgument = leftArgument;
    VerbalCounting.rightArgument = rightArgument;
    VerbalCounting.action = action;
    VerbalCounting.result = result;

    return blockCalculation;
  }

  static createBlockProgress() {
    const progressBar = createDOMElement(
      'div',
      {
        class: 'block-progress__progress-bar',
        role: 'progressbar',
      },
    );
    const progress = createDOMElement('div', { class: 'block-progress' }, progressBar);

    VerbalCounting.progressBar = progressBar;

    return progress;
  }
}
