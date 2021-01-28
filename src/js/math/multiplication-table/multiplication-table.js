import createDOMElement from '../../create-dom-element';
import { Simulators } from '../../constants/math-simulators';
import MultiplicationTableModel from './multiplication-table-model';
import MultiplicationTableView from './multiplication-table-view';
import MultiplicationTableController from './multiplication-table-controller';

export default class MultiplicationTable {
  static initialize() {
    const model = new MultiplicationTableModel();
    const view = new MultiplicationTableView(model);
    // eslint-disable-next-line no-unused-vars
    const controller = new MultiplicationTableController(model, view);
  }

  static createPage() {
    const multiplicationTable = createDOMElement('section', { class: Simulators[1] });

    MultiplicationTable.initialize();

    return multiplicationTable;
  }
}
