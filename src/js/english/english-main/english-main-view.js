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
  }

  createPage() {
    this.init();
    return this.wrapper;
  }

  createWrapper() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('english-main__wrapper');
  }

  createWordsBlock() {
    this.wordsBlock = document.createElement('div');
    this.wordsBlock.classList.add('english-main__block');
    this.wordsBlock.innerHTML = `
    <a href = "/#/english/words">
      <div class = "card-menu">
        <img src='assets/images/menu/categories.jpg'>
        <h3>Learn words</h3>
        <p>There are 2 modes of play and training, 1000 of the most important words in the English language</p>
      </div>
    </a>
    `;
    this.wrapper.appendChild(this.wordsBlock);
  }

  createMusicBlock() {
    this.musicBlock = document.createElement('div');
    this.musicBlock.classList.add('english-main__block');
    this.musicBlock.innerHTML = `
    <a href = "/#/english/music">
      <div class = "card-menu">
        <img src='assets/images/menu/music.jpg'>
        <h3>Listen music</h3>
        <p>10 best songs for learning English</p>
      </div>
    </a>
    `;
    this.wrapper.appendChild(this.musicBlock);
  }

  createStatisticsBlock() {
    this.statisticsBlock = document.createElement('div');
    this.statisticsBlock.classList.add('english-main__block');
    this.statisticsBlock.innerHTML = `
    <a href = "/#/english/statistics">
      <div class = "card-menu">
        <img src='assets/images/menu/statistics.jpg'>
        <h3>See statistics</h3>
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
