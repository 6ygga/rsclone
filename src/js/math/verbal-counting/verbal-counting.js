import createDOMElement from '../../create-dom-element';
import { Simulators } from '../../constants/math-simulators';

export default class VerbalCounting {
  static render() {
    const verbalCounting = VerbalCounting.createPage();

    document.body.appendChild(verbalCounting);
  }

  static createPage() {
    const verbalCounting = createDOMElement('section', { class: Simulators[0] });

    return verbalCounting;
  }
}
