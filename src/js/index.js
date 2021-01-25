// import EnglishMusic from './english/english-music/music-view';
// import CardList from './english/english-words/card-list-view';
// import categories from './english/english-words/categories-data';
import EnglishMain from './english/english-main/english-main-view';
/* const englishMusic = new EnglishMusic();
englishMusic.initContainer(); */
const body = document.querySelector('body');
// const cardList = new CardList();
const englishMain = new EnglishMain();
englishMain.init();
body.appendChild(englishMain.getEnglishMain());

/* const menu = categories;
cardList.render(menu); */
