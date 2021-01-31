import createDOMElement from '../create-dom-element';
import { Simulators } from '../constants/math-simulators';
import {
  FRACTIONS,
  MULTIPLICATION_TABLE,
  TIME_GAME,
  VERBAL_COUNTING,
} from '../constants/routes';

export default class MathMain {
  static createPage() {
    const cardsLinks = MathMain.createCardsLinks();
    const mathMain = createDOMElement('section', { class: 'math' }, ...cardsLinks);

    return mathMain;
  }

  static createCardsLinks() {
    const routs = [FRACTIONS, MULTIPLICATION_TABLE, TIME_GAME, VERBAL_COUNTING];
    const cardLinks = Simulators.map((item, index) => {
      const card = MathMain.createCard(item);
      const link = createDOMElement('a', { class: 'link', href: `${routs[index]}` }, card);

      return link;
    });

    return cardLinks;
  }

  static createCard(simulator) {
    const title = createDOMElement('h5', { class: 'card-link__title' });
    const body = createDOMElement('div', { class: 'card-link__body' }, title);
    const card = createDOMElement('div', { class: 'card-link' }, body);

    title.innerText = simulator;

    return card;
  }

  static createBlockButtons() {
    const buttonCheck = createDOMElement(
      'button',
      { class: 'block-buttons__button block-buttons__button-check', type: 'button' },
      'Проверить',
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
