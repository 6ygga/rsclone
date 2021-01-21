import createDOMElement from '../../create-dom-element';
import { Simulators } from '../../constants/math-simulators';

export default class TimeGame {
  static createPage() {
    const timeGame = createDOMElement('section', { class: Simulators[2] });

    return timeGame;
  }
}
