import EnglishMathAppModel from './english-math-app-model';
import EnglishMathAppView from './english-math-app-view';
import EnglishMathAppController from './english-math-app-controller';

export default class EnglishMathApp {
  static initialize() {
    const model = new EnglishMathAppModel();
    const view = new EnglishMathAppView(model);
    const controller = new EnglishMathAppController(model, view);
    controller.changePage(window.location.href.slice(window.location.href.indexOf('#') - 1));
  }
}
