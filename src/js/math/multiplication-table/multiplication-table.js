import createDOMElement from '../../create-dom-element';
import { TableResultNameCol } from '../../constants/math-simulators';
import MultiplicationTableModel from './multiplication-table-model';
import MultiplicationTableView from './multiplication-table-view';
import MultiplicationTableController from './multiplication-table-controller';
import MathMain from '../math-main';

export default class MultiplicationTable {
  static initialize() {
    const model = new MultiplicationTableModel();
    const view = new MultiplicationTableView(model);
    // eslint-disable-next-line no-unused-vars
    const controller = new MultiplicationTableController(model, view);
  }

  static createPage() {
    const blockButtons = MathMain.createBlockButtons();
    const blockSetting = MultiplicationTable.createBlockSetting();
    const blockMultiplication = MultiplicationTable.createBlockMultiplication();
    const blockTableResult = MultiplicationTable.createBlockTableResult();
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

    MultiplicationTable.initialize();

    return multiplicationTable;
  }

  static createBlockSetting() {
    const buttons = Array(8).fill(null).map((item, index) => createDOMElement(
      'button',
      {
        type: 'button',
        'data-check': 'false',
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
    const buttonStart = createDOMElement('button', { class: 'block-setting__button-start' }, 'Старт');
    const setting = createDOMElement('div', { class: 'block-setting' }, buttonGroup, buttonStart);

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

    return blockMultiplication;
  }

  static createBlockTableResult() {
    const th = TableResultNameCol.map((item) => createDOMElement('th', { scope: 'col' }, `${item}`));
    const tr = createDOMElement('tr', {}, ...th);
    const thead = createDOMElement('thead', {}, tr);
    const tbody = createDOMElement('tbody', {});
    const table = createDOMElement('table', { class: 'block-table-result__table' }, thead, tbody);
    const tableResult = createDOMElement('div', { class: 'block-table-result' }, table);

    return tableResult;
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

    return progress;
  }
}
