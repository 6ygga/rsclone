import MathMain from '../math/math-main';
import { MATH } from '../constants/routes';
import EnglishMathAppModel from './english-math-app-model';
import EnglishMathAppView from './english-math-app-view';
import EnglishMathAppController from './english-math-app-controller';

export default class EnglishMathApp {
  static initialize() {
    const main = document.createElement('main');

    main.appendChild(MathMain.createPage());
    document.body.appendChild(main);
    document.location.replace(`${MATH}`);

    const model = new EnglishMathAppModel();
    const view = new EnglishMathAppView(model);
    // eslint-disable-next-line no-unused-vars
    const controller = new EnglishMathAppController(model, view);
  }
}
