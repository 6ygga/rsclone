import EventEmitter from '../event-emitter';
import MathMain from '../math/math-main';
import Fractions from '../math/fractions/fractions';
import MultiplicationTable from '../math/multiplication-table/multiplication-table';
import TimeGame from '../math/time-game/time-game';
import VerbalCounting from '../math/verbal-counting/verbal-counting';
import * as paths from '../constants/routes';
import { clearElement } from '../dom-elements-helpers';
import { MainPageView } from '../main-page/main-page-view';
import EnglishMain from '../english/english-main/english-main-view';
import EnglishMusic from '../english/english-music/music-view';
import Statistics from '../english/english-statistics/statistics-view';
import CardList from '../english/english-words/card-list-view';
import categories from '../english/english-words/categories-data';
import words from '../english/english-words/words-data';

export default class EnglishMathAppView {
  #model;

  #emitter;

  constructor(model) {
    this.#model = model;
    this.#emitter = new EventEmitter();

    this.#model.emitter.on('changePage', () => this.changePage());

    window.addEventListener('hashchange', (event) => this.#emitter.emit('changePage', event));
  }

  get emitter() {
    return this.#emitter;
  }

  changePage() {
    switch (this.#model.route) {
      case paths.MAIN: this.render(MainPageView.renderMain());
        break;
      case paths.MATH: this.render(MathMain.createPage());
        break;
      case paths.FRACTIONS: this.render(Fractions.createPage());
        break;
      case paths.MULTIPLICATION_TABLE: this.render(MultiplicationTable.createPage());
        break;
      case paths.TIME_GAME: this.render(TimeGame.createPage());
        break;
      case paths.VERBAL_COUNTING: this.render(VerbalCounting.createPage());
        break;
      case paths.ENGLISH: {
        const englishMain = new EnglishMain();
        this.render(englishMain.createPage());
        break;
      }
      case paths.ENGLISH_MUSIC: {
        const englishMusic = new EnglishMusic();
        this.render(englishMusic.createPage());
        break;
      }
      case paths.ENGLISH_STATISTICS: {
        const statistics = new Statistics();
        this.render(statistics.createPage());
        break;
      }
      case paths.ENGLISH_WORDS: {
        const englishWords = new CardList();
        this.render(englishWords.createPage());
        englishWords.render(categories);
        break;
      }
      default: {
        const pathArray = location.hash.split('/');
        const needCategory = pathArray[pathArray.length - 1];
        if (this.checkWordsCategories(needCategory)) {
          const englishWords = new CardList();
          this.render(englishWords.createPage());
          englishWords.render(words[needCategory]);
        } else {
          document.location.replace(`${paths.MAIN}`);
        }
        break;
      }
    }
  }

  render(page) {
    const main = document.querySelector('main');

    clearElement(main);

    main.appendChild(page);
  }

  checkWordsCategories(needCategory) {
    let flag = false;
    categories.forEach((element) => {
      if (element.name === needCategory) {
        flag = true;
      }
    });
    return flag;
  }
}
