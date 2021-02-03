import createDOMElement from '../../create-dom-element';
import { TableResultNameCol } from '../../constants/math-simulators';
import MultiplicationTableModel from './multiplication-table-model';
import MultiplicationTableView from './multiplication-table-view';
import MultiplicationTableController from './multiplication-table-controller';
import MathMain from '../math-main';

export default class MultiplicationTable {
  static multiplicand;

  static multiplier;

  static result;

  static buttonCheck;

  static buttonsNumber;

  static table;

  static buttonStart;

  static buttonGroupSetting;

  static progressBar;

  static initialize() {
    const model = new MultiplicationTableModel();
    const view = new MultiplicationTableView(model, {
      multiplicand: MultiplicationTable.multiplicand,
      multiplier: MultiplicationTable.multiplier,
      result: MultiplicationTable.result,
      buttonCheck: MultiplicationTable.buttonCheck,
      buttonsNumber: MultiplicationTable.buttonsNumber,
      table: MultiplicationTable.table,
      buttonStart: MultiplicationTable.buttonStart,
      buttonGroupSetting: MultiplicationTable.buttonGroupSetting,
      progressBar: MultiplicationTable.progressBar,
    });
    // eslint-disable-next-line no-unused-vars
    const controller = new MultiplicationTableController(model, view);

    view.show();
  }

  static createPage() {
    const { blockButtons, buttonCheck, buttonsNumber } = MathMain.createBlockButtons();
    const blockSetting = MultiplicationTable.createBlockSetting();
    const blockMultiplication = MultiplicationTable.createBlockMultiplication();
    const { blockTableResult, table } = MathMain.createBlockTableResult(TableResultNameCol);
    const blockProgress = MultiplicationTable.createBlockProgress();
    const multiplicationTable = createDOMElement(
      'section',
      { class: 'multiplication-table' },
      blockSetting,
      blockButtons,
      blockMultiplication,
      blockTableResult,
      blockProgress,
    );

    MultiplicationTable.buttonCheck = buttonCheck;
    MultiplicationTable.buttonsNumber = buttonsNumber;
    MultiplicationTable.table = table;
    MultiplicationTable.initialize();

    return multiplicationTable;
  }

  static createBlockSetting() {
    const buttons = Array(8).fill(null).map((item, index) => createDOMElement(
      'button',
      {
        type: 'button',
        'data-check': 'true',
        'data-number': `${index + 2}`,
      },
      `${index + 2}`,
    ));
    const buttonGroup = createDOMElement(
      'div',
      {
        class: 'block-setting__button-group',
        role: 'group',
      },
      ...buttons,
    );
    const buttonStart = createDOMElement('button', { class: 'block-setting__button-start' }, 'Start');
    const setting = createDOMElement('div', { class: 'block-setting' }, buttonGroup, buttonStart);

    MultiplicationTable.buttonGroupSetting = buttons;
    MultiplicationTable.buttonStart = buttonStart;

    return setting;
  }

  static createBlockMultiplication() {
    const times = createDOMElement('span', {}, document.createTextNode(String.fromCharCode(215)));
    const equals = createDOMElement('span', {}, document.createTextNode(String.fromCharCode(61)));
    const multiplicand = createDOMElement('span', { class: 'block-multiplication__argument' }, '0');
    const multiplier = createDOMElement('span', { class: 'block-multiplication__argument' }, '0');
    const result = createDOMElement(
      'input',
      {
        class: 'block-multiplication__result',
        type: 'text',
        maxLength: '2',
        placeholder: '?',
      },
    );
    const blockMultiplication = createDOMElement(
      'div',
      { class: 'block-multiplication' },
      multiplicand,
      times,
      multiplier,
      equals,
      result,
    );

    MultiplicationTable.multiplicand = multiplicand;
    MultiplicationTable.multiplier = multiplier;
    MultiplicationTable.result = result;

    return blockMultiplication;
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

    MultiplicationTable.progressBar = progressBar;

    return progress;
  }
}
