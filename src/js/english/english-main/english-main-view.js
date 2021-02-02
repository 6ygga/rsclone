import { userAuthModel } from '../../user-auth/user-auth-model';
import words from '../english-words/words-data';
import { saveStatistics, getStatistics } from '../../services/user-service';

export default class EnglishMain {
  constructor() {
    this.countCards = 3;
    this.wrapper = null;
  }

  init() {
    this.createWrapper();
    this.createWordsBlock();
    this.createMusicBlock();
    this.createStatisticsBlock();
    if (userAuthModel.isAuthenticated()) {
      getStatistics(userAuthModel.getToken()).then((response) => response.json()).then((text) => {
        if (text == null) {
          this.clearStatistics();
        } else {
          localStorage.setItem('statistics', text.data);
        }
        setTimeout(() => {
          this.renderStatistics(JSON.parse(localStorage.getItem('statistics')));
        }, 500);
        setTimeout(() => {
          this.sortTable();
        }, 500);
      }).catch((e) => {
        /* eslint-disable-next-line */
        console.log(e);
      });
    } else {
      this.clearStatistics();
    }
  }

  createPage() {
    this.init();
    return this.wrapper;
  }

  createWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('english-main__wrapper');
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

  createWordsBlock() {
    this.wordsBlock = document.createElement('div');
    this.wordsBlock.classList.add('english-main__block');
    // <img src='assets/images/menu/categories.jpg'>
    this.wordsBlock.innerHTML = `
    <a href = "/#/english/words">
      <div class = "card-menu card-learn">
        <h3>Learn words</h3>
        <span>A</span>
        <p>There are 2 modes of play and training, 1000 of the most important words in the English language</p>
      </div>
    </a>
    `;
    this.wrapper.appendChild(this.wordsBlock);
  }
  // <img src='assets/images/menu/music.jpg'>

  createMusicBlock() {
    this.musicBlock = document.createElement('div');
    this.musicBlock.classList.add('english-main__block');
    this.musicBlock.innerHTML = `
    <a href = "/#/english/music">
      <div class = "card-menu card-listen">
        <h3>Listen music</h3>
        <span>${String.fromCharCode(9835)}</span>
        <p>10 best songs for learning English</p>
      </div>
    </a>
    `;
    this.wrapper.appendChild(this.musicBlock);
  }
  // <img src='assets/images/menu/statistics.jpg'>

  createStatisticsBlock() {
    this.statisticsBlock = document.createElement('div');
    this.statisticsBlock.classList.add('english-main__block');
    this.statisticsBlock.innerHTML = `
    <a href = "/#/english/statistics">
      <div class = "card-menu card-statistics">
        <h3>See statistics</h3>
        <span class = "card-menu__span">%</span>
        <p>Follow your success</p>
      </div>
    </a>
    `;
    this.wrapper.appendChild(this.statisticsBlock);
  }

  getEnglishMain() {
    return this.wrapper;
  }
}
