import createDOMElement from '../create-dom-element';
import { Simulators } from '../constants/math-simulators';

export default class MathMain {
  static render() {
    const mathMain = MathMain.createPage();

    document.body.appendChild(mathMain);
  }

  static createPage() {
    const cardsLinks = MathMain.createCardsLinks();
    const mathMain = createDOMElement('section', { class: 'math' }, ...cardsLinks);

    return mathMain;
  }

  static createCardsLinks() {
    const cardLinks = Simulators.map((item) => {
      const card = MathMain.createCard(item);
      const link = createDOMElement(
        'a',
        { class: 'link', href: `/${item}` },
        card,
      );

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
}
