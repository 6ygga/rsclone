import createDOMElement from '../../create-dom-element';
import { Simulators } from '../../constants/math-simulators';

export default class TimeGame {
  static render() {
    const timeGame = TimeGame.createPage();

    document.body.appendChild(timeGame);
  }

  static createPage() {
    const timeGame = createDOMElement('section', { class: Simulators[2] });

    return timeGame;
  }
}
