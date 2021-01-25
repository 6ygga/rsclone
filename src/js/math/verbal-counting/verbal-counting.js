import createDOMElement from '../../create-dom-element';
import { Simulators } from '../../constants/math-simulators';

export default class VerbalCounting {
  static createPage() {
    const verbalCounting = createDOMElement('section', { class: Simulators[3] });

    return verbalCounting;
  }
}
