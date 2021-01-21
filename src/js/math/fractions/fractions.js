import createDOMElement from '../../create-dom-element';
import { Simulators } from '../../constants/math-simulators';

export default class Fractions {
  static createPage() {
    const fractions = createDOMElement('section', { class: Simulators[0] });

    return fractions;
  }
}
