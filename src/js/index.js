import 'bootstrap';
import '../scss/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import EnglishMathApp from './english-math-app/english-math-app';
import MainPage from './main-page/main-page';
import UserAuth from './user-auth/user-auth';

MainPage.initialize();
UserAuth.initialize();
EnglishMathApp.initialize();
