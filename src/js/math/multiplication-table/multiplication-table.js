import createDOMElement from '../../create-dom-element';
import { Simulators } from '../../constants/math-simulators';

export default class MultiplicationTable {
  static render() {
    const multiplicationTable = MultiplicationTable.createPage();

    document.body.appendChild(multiplicationTable);
  }

  static createPage() {
    const multiplicationTable = createDOMElement('section', { class: Simulators[1] });

    return multiplicationTable;
  }
}
