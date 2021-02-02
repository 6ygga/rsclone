import createDOMElement from '../../create-dom-element';
import WarningPage from '../../warning-page';
import { TableResultNameCol } from '../../constants/math-simulators';
import { userAuthModel } from '../../user-auth/user-auth-model';
import { getMathStatistics } from '../../services/user-service';

export default class MathStatistics {
  static createPage() {
    if (!userAuthModel.isAuthenticated()) return WarningPage.createPage();

    const multiplicationTableStat = MathStatistics.createBlockInfo('multiplication-table');
    const verbalCountingStat = MathStatistics.createBlockInfo('verbal-counting');

    getMathStatistics(userAuthModel.getToken())
      .then((response) => response.json())
      .then((obj) => {
        const saveLogs = obj
          ? JSON.parse(obj.data)
          : { verbalCounting: [], multiplicationTable: [] };

        const verbalCounting = this.createTable(saveLogs.verbalCounting);
        const multiplicationTable = this.createTable(saveLogs.multiplicationTable);

        verbalCountingStat.appendChild(verbalCounting);
        multiplicationTableStat.appendChild(multiplicationTable);
      });

    const statistics = createDOMElement(
      'section',
      { class: 'math-statistics' },
      multiplicationTableStat,
      verbalCountingStat,
    );

    return statistics;
  }

  static createBlockInfo(name) {
    const header = createDOMElement('h3', {}, name.split('-').join(' '));
    const block = createDOMElement(
      'div',
      { class: `math-statistics__block-info math-statistics__${name}` },
      header,
    );

    return block;
  }

  static createTable(statistics) {
    const thead = TableResultNameCol.map((item) => createDOMElement('th', {}, item));
    const tr = createDOMElement('tr', {}, ...thead);
    const rows = statistics.map((item) => {
      const example = createDOMElement(
        'td',
        {},
        `${item.args[0]} ${item.action ? String.fromCharCode(item.action) : String.fromCharCode(215)} ${item.args[1]}`,
      );
      const solution = createDOMElement('td', {}, `${item.solution}`);
      const response = createDOMElement('td', {}, `${item.response}`);
      const row = createDOMElement('tr', { 'data-correct': item.correct ? 'true' : '' }, example, solution, response);

      return row;
    });
    const table = createDOMElement('table', {}, tr, ...rows);

    return table;
  }
}
