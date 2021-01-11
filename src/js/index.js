// import EnglishMusic from './english/english-music/music-view';
import CardList from './english/english-words/card-list-view';
import categories from './english/english-words/categories-data';

/* const englishMusic = new EnglishMusic();
englishMusic.initContainer(); */
const body = document.querySelector('body');
const cardList = new CardList();

body.appendChild(cardList.getCardList());
const menu = categories;
cardList.render(menu);
