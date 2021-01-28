import createDOMElement from '../../create-dom-element';
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
    const blockMultiplication = MultiplicationTable.createBlockMultiplication();
    const blockButtons = MathMain.createBlockButtons();
    const multiplicationTable = createDOMElement(
      'section',
      { class: 'multiplication-table' },
      blockMultiplication,
      blockButtons,
    );

    MultiplicationTable.initialize();

    return multiplicationTable;
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
}
