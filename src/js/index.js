// import EnglishMusic from './english/english-music/music-view';
// import CardList from './english/english-words/card-list-view';
// import categories from './english/english-words/categories-data';
// import EnglishMain from './english/english-main/english-main-view';
import Statistics from './english/english-statistics/statistics-view';
import words from './english/english-words/words-data';
/* const englishMusic = new EnglishMusic();
englishMusic.initContainer(); */
const body = document.querySelector('body');
// const cardList = new CardList();
const statistics = new Statistics();
statistics.init();
body.appendChild(statistics.getStatistics());
statistics.sortTable();
/* const menu = categories;
cardList.render(menu); */

function createStatistic() {
  console.log(localStorage.getItem('statistic'));
  // const value = JSON.parse(localStorage.getItem('statistic'));
  // if (value) return;

  const keys = Object.keys(words);
  const statistic = {
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
      statistic.word.push(words[keys[i]][j].word);
      statistic.translation.push(words[keys[i]][j].translation);
      statistic.category.push(keys[i]);
      statistic.click.push(0);
      statistic.correct.push(0);
      statistic.wrong.push(0);
      statistic.errors.push(0);
    }
  }
  localStorage.setItem('statistic', JSON.stringify(statistic));
}

createStatistic();
