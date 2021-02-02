import createDOMElement from '../create-dom-element';
import { Simulators } from '../constants/math-simulators';
import {
  MULTIPLICATION_TABLE,
  VERBAL_COUNTING,
  MATH_STATISTICS,
} from '../constants/routes';

export default class MathMain {
  static createPage() {
    const cardsLinks = MathMain.createCardsLinks();
    const mathMain = createDOMElement('section', { class: 'math' }, ...cardsLinks);

    return mathMain;
  }

  static createCardsLinks() {
    const cardMultiplicationTable = MathMain.createCard(Simulators[0], String.fromCharCode(215));
    const cardVerbalCounting = MathMain.createCard(Simulators[1], '1');
    const cardMathStatistics = MathMain.createCard('statistics', '?');
    const linkMultiplicationTable = createDOMElement(
      'a',
      { class: 'link', href: `${MULTIPLICATION_TABLE}` },
      cardMultiplicationTable,
    );
    const linkVerbalCounting = createDOMElement(
      'a',
      { class: 'link', href: `${VERBAL_COUNTING}` },
      cardVerbalCounting,
    );
    const linkMathStatistics = createDOMElement(
      'a',
      { class: 'link', href: `${MATH_STATISTICS}` },
      cardMathStatistics,
    );

    return [linkMultiplicationTable, linkVerbalCounting, linkMathStatistics];
  }

  static createCard(simulator, symbol) {
    const title = createDOMElement('h3', { class: 'card-link__title' });
    const body = createDOMElement('div', { class: 'card-link__body' }, symbol);
    const card = createDOMElement('div', { class: `card-link card-link__${simulator}` }, title, body);

    title.innerText = simulator.split('-').join(' ');

    return card;
  }

  static createBlockButtons() {
    const buttonCheck = createDOMElement(
      'button',
      { class: 'block-buttons__button block-buttons__button-check', type: 'button' },
      'Check',
    );
    const buttonsNumber = Array(10).fill(null).map((item, index) => {
      const button = createDOMElement(
        'button',
        { class: 'block-buttons__button block-buttons__button-number', type: 'button' },
        `${index}`,
      );

      return button;
    });
    const blockButtons = createDOMElement(
      'div',
      { class: 'block-buttons' },
      ...buttonsNumber.reverse(),
      buttonCheck,
    );

    return {
      blockButtons,
      buttonCheck,
      buttonsNumber,
    };
  }

  static createBlockTableResult(nameCol) {
    const columns = nameCol.map((item) => createDOMElement('div', { class: 'block-table-result__table_column' }, `${item}`));
    const table = createDOMElement('table', { class: 'block-table-result__table' }, ...columns);
    const blockTableResult = createDOMElement('div', { class: 'block-table-result' }, table);

    return {
      blockTableResult,
      table,
    };
  }
}
