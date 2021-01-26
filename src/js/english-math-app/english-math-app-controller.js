export default class EnglishMathAppController {
  #model;

  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.#view.emitter.on('changePage', (event) => this.changePage(event.newURL));
  }

  changePage(url) {
    const newRoute = url.slice(url.indexOf('#') - 1);
    this.#model.changeRoute(newRoute);
  }
}
