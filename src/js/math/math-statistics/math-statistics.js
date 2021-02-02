import createDOMElement from '../../create-dom-element';

export default class MathStatistics {
  static createPage() {
    const multiplicationTableStat = MathStatistics.createBlockInfo('multiplication-table');
    const verbalCountingStat = MathStatistics.createBlockInfo('verbal-counting');

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
}
