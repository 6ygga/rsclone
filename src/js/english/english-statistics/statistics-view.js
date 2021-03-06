import words from '../english-words/words-data';
import { userAuthModel } from '../../user-auth/user-auth-model';
import { saveStatistics } from '../../services/user-service';
import warningPage from '../../warning-page';
import createDOMElement from '../../create-dom-element';

export default class Statistics {
  constructor() {
    this.wrapper = null;
  }

  init() {
    this.createWrapper();
    this.renderStatistics(JSON.parse(localStorage.getItem('statistics')));
    setTimeout(() => {
      this.sortTable();
    }, 500);
  }

  createWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('table-container');
  }

  createPage() {
    if (userAuthModel.isAuthenticated()) {
      this.init();
      return this.wrapper;
    }
    return warningPage.createPage();
  }

  renderStatistics(model) {
    this.resetButton = document.createElement('div');
    this.resetButton.classList.add('reset-button');
    this.resetButton.innerText = 'Reset';
    this.wrapper.appendChild(this.resetButton);

    const table = document.createElement('table');
    table.classList.add('table_sort');
    let th; let tr; let td;
    let row; let cell;
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    tr = document.createElement('tr');
    for (let i = 0; i < Object.keys(model).length; i += 1) {
      th = document.createElement('th');
      th.classList.add('table_sort__th');
      tr.appendChild(th);
      th.innerText = Object.keys(model)[i];
    }
    thead.appendChild(tr);
    table.appendChild(thead);

    for (row = 0; row < model.word.length; row += 1) {
      tr = document.createElement('tr');
      for (cell = 0; cell < Object.keys(model).length; cell += 1) {
        td = document.createElement('td');
        td.classList.add('table_sort__td');
        tr.appendChild(td);
        td.innerText = model[Object.keys(model)[cell]][row];
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    const tableWrapper = createDOMElement('div', { class: 'eng-stat-table-wrap' }, table);

    this.wrapper.appendChild(tableWrapper);
    this.resetStatistics.bind(this)();
  }

  sortTable() {
    const getSort = ({ target }) => {
      target.dataset.order = -(target.dataset.order || -1);
      const datasetOrder = target.dataset.order;
      const order = datasetOrder;
      const index = [...target.parentNode.cells].indexOf(target);
      const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
      const comparator = (position, sequence) => (a, b) => sequence * collator.compare(
        a.children[position].innerHTML,
        b.children[position].innerHTML,
      );
      /* eslint-disable-next-line */
      for (const tBody of target.closest('table').tBodies) {
        tBody.append(...[...tBody.rows].sort(comparator(index, order)));
      }
      /* eslint-disable-next-line */
      for (const cell of target.parentNode.cells) {
        cell.classList.toggle('sorted', cell === target);
      }
    };
    document.querySelectorAll('.table_sort thead').forEach((tableTH) => tableTH.addEventListener('click', (event) => getSort(event)));
  }

  clearStatistics() {
    const keys = Object.keys(words);
    const statisticsObj = {
      word: [],
      translation: [],
      category: [],
      click: [],
      correct: [],
      wrong: [],
      errors: [],
    };
    for (let i = 0; i < keys.length; i += 1) {
      for (let j = 0; j < words[keys[i]].length; j += 1) {
        statisticsObj.word.push(words[keys[i]][j].word);
        statisticsObj.translation.push(words[keys[i]][j].translation);
        statisticsObj.category.push(keys[i]);
        statisticsObj.click.push(0);
        statisticsObj.correct.push(0);
        statisticsObj.wrong.push(0);
        statisticsObj.errors.push(0);
      }
    }
    if (userAuthModel.isAuthenticated()) {
      saveStatistics(JSON.stringify(statisticsObj), userAuthModel.getToken());
    }
    localStorage.setItem('statistics', JSON.stringify(statisticsObj));
  }

  resetStatistics() {
    /* eslint-disable-next-line */
    this.resetButton.onclick = function () {
      localStorage.clear();
      this.clearStatistics();
      this.wrapper.innerHTML = '';
      this.renderStatistics(JSON.parse(localStorage.getItem('statistics')));
      setTimeout(() => {
        this.sortTable();
      }, 500);
    }.bind(this);
  }
}
