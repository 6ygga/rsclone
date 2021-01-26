import './statistics.scss';
import words from '../english-words/words-data';

export default class Statistics {
  constructor() {
    this.wrapper = null;
  }

  init() {
    this.createWrapper();
    this.renderStatistic(JSON.parse(localStorage.getItem('statistic')));
  }

  createWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('table-container');
  }

  getStatistics() {
    return this.wrapper;
  }

  renderStatistic(model) {
    /* document.querySelector(".card-list").innerHTML = "";
    if(document.querySelector(".table-container") !== null){
        document.querySelector(".table-container").innerHTML="";
    }; */
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
      tr.appendChild(th);
      th.innerText = Object.keys(model)[i];
    }
    thead.appendChild(tr);
    table.appendChild(thead);

    for (row = 0; row < model.word.length; row += 1) {
      tr = document.createElement('tr');
      for (cell = 0; cell < Object.keys(model).length; cell += 1) {
        td = document.createElement('td');
        tr.appendChild(td);
        td.innerText = model[Object.keys(model)[cell]][row];
      }
      tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    this.wrapper.appendChild(table);
    this.createStatistic.bind(this)();
    // this.repeatWords();
  }

  sortTable() {
    const getSort = ({ target }) => {
      /* eslint-disable-next-line */
      const order = (target.dataset.order = -(target.dataset.order || -1));
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
    console.log(document.querySelectorAll('.table_sort thead'));
    document.querySelectorAll('.table_sort thead').forEach((tableTH) => tableTH.addEventListener('click', (event) => getSort(event)));
  }

  createStatistic() {
    /* eslint-disable-next-line */
    this.resetButton.onclick = function () {
      localStorage.clear();
      const information = words;
      const statistic = {
        word: [],
        translation: [],
        category: [],
        click: [],
        correct: [],
        wrong: [],
        errors: [],
      };
      for (let i = 1; i < information.length; i += 1) {
        for (let j = 0; j < information[i].length; j += 1) {
          statistic.word.push(information[i][j].word);
          statistic.translation.push(information[i][j].translation);
          statistic.category.push(information[0][i - 1].name);
          statistic.click.push(0);
          statistic.correct.push(0);
          statistic.wrong.push(0);
          statistic.errors.push(0);
        }
      }
      localStorage.setItem('statistic', JSON.stringify(statistic));
      // const wrapper = document.querySelector('.wrapper__card-list');
      // const container = document.querySelector('.table-container');
      // this.wrapper.removeChild(container);
      this.wrapper.innerHTML = '';
      this.renderStatistic(JSON.parse(localStorage.getItem('statistic')));
    };
  }
}
