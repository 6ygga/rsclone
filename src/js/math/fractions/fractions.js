import createDOMElement from '../../create-dom-element';
import { Simulators } from '../../constants/math-simulators';

export default class Fractions {
  static render() {
    const fractions = Fractions.createPage();

    document.body.appendChild(fractions);
  }

  static createPage() {
    const fractions = createDOMElement('section', { class: Simulators[0] });

    return fractions;
  }
}
