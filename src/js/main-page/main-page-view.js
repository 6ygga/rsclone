import createDOMElement from '../create-dom-element';
import EventEmitter from '../event-emitter';
import {
  MAIN,
  MATH,
  ENGLISH,
} from '../constants/routes';

export class MainPageView extends EventEmitter {
  constructor() {
    super();
    this.renderHeader();
    this.createMain();
    this.renderFooter();
  }

  createMain() {
    this.main = createDOMElement('main', { role: 'main', class: 'main container' });
    document.body.appendChild(this.main);
  }

  static renderMain() {
    const englishImg = createDOMElement('img', {
      src: 'assets/images/a8ov_s5nh_171123-min.jpg',
      class: 'img-thumbnail mt-3 mx-auto shadow-sm sub-img',
      alt: 'English',
      width: '1100px',
    });
    const englishLink = createDOMElement('a', { href: `${ENGLISH}` }, englishImg);

    const mathImg = createDOMElement('img', {
      src: 'assets/images/h9ij_ddcc_171126-min.jpg',
      class: 'img-thumbnail mt-3 mx-auto shadow-sm sub-img',
      alt: 'Math',
      width: '1100px',
    });
    const mathLink = createDOMElement('a', { href: `${MATH}` }, mathImg);

    const section = createDOMElement('section', {}, mathLink, englishLink);

    return section;
  }

  renderHeader() {
    const togglerIcon = createDOMElement('span', { class: 'navbar-toggler-icon' });

    const toggleButton = createDOMElement('button', {
      type: 'button', class: 'navbar-toggler', 'data-toggle': 'collapse', 'data-target': '#navbarCollapse',
    }, togglerIcon);

    const brandB = createDOMElement('b', {}, 'JS');
    const brandLink = createDOMElement('a', { href: `${MAIN}`, class: 'navbar-brand' }, 'Clone', brandB);

    const mathLink = createDOMElement('a', { href: `${MATH}`, class: 'nav-item nav-link' }, 'Math');
    const englishLink = createDOMElement('a', { href: `${ENGLISH}`, class: 'nav-item nav-link' }, 'English');
    const navbarNav = createDOMElement('div', { class: 'navbar-nav' }, mathLink, englishLink);

    const controls = createDOMElement('div', { class: 'navbar-nav ml-auto action-buttons', id: 'authControls' }, this.renderLoginForm(), this.renderSignUpForm());

    const navbarCollapse = createDOMElement('div', { class: 'collapse navbar-collapse justify-content-start', id: 'navbarCollapse' }, navbarNav, controls);
    const nav = createDOMElement('nav', { class: 'navbar navbar-expand-lg navbar-light bg-light' }, brandLink, toggleButton, navbarCollapse);
    this.header = createDOMElement('header', {}, nav);

    document.body.appendChild(this.header);
  }

  renderLoginForm() {
    const loginLink = createDOMElement('div', { class: 'nav-link dropdown-toggle mr-4', href: '#', 'data-toggle': 'dropdown' }, 'Login');

    const signText = createDOMElement('p', { class: 'hint-text' }, 'Sign in');
    const userNameInput = createDOMElement('input', {
      type: 'text',
      class: 'form-control username',
      placeholder: 'Username',
      required: 'required',
    });
    const userNameGroup = createDOMElement('div', { class: 'form-group' }, userNameInput);

    const passwordInput = createDOMElement('input', {
      type: 'password',
      class: 'form-control password',
      placeholder: 'Password',
      required: 'required',
    });
    const passwordGroup = createDOMElement('div', { class: 'form-group' }, passwordInput);

    const feedbackDiv = createDOMElement('div', { class: 'invalid-feedback' });
    const feedbackGroup = createDOMElement('div', { class: 'form-group' }, feedbackDiv);

    const submitButton = createDOMElement('input', {
      type: 'submit',
      class: 'btn btn-primary btn-block',
      value: 'Login',
      id: 'login',
    });

    const loginForm = createDOMElement('div', { class: 'dropdown-menu action-form' }, signText, userNameGroup, passwordGroup, feedbackGroup, submitButton);
    this.loginDropdown = createDOMElement('div', { class: 'nav-item dropdown', id: 'loginForm' }, loginLink, loginForm);

    return this.loginDropdown;
  }

  renderSignUpForm() {
    const signUpLink = createDOMElement('div', { class: 'btn btn-primary dropdown-toggle sign-up-btn', href: '#', 'data-toggle': 'dropdown' }, 'Sign up');

    const signText = createDOMElement('p', { class: 'hint-text' }, 'Fill in this form to create your account!');

    const emailInput = createDOMElement('input', {
      type: 'email',
      class: 'form-control email',
      placeholder: 'E-mail',
      required: 'required',
    });
    const emailGroup = createDOMElement('div', { class: 'form-group' }, emailInput);

    const userNameInput = createDOMElement('input', {
      type: 'text',
      class: 'form-control username',
      placeholder: 'Username',
      required: 'required',
    });
    const userNameGroup = createDOMElement('div', { class: 'form-group' }, userNameInput);

    const passwordInput = createDOMElement('input', {
      type: 'password',
      class: 'form-control password',
      placeholder: 'Password',
      required: 'required',
    });
    const passwordGroup = createDOMElement('div', { class: 'form-group' }, passwordInput);

    const rPasswordInput = createDOMElement('input', {
      type: 'password',
      class: 'form-control r-password',
      placeholder: 'Confirm',
      required: 'required',
    });
    const rPasswordGroup = createDOMElement('div', { class: 'form-group' }, rPasswordInput);

    const feedbackDiv = createDOMElement('div', { class: 'invalid-feedback' });
    const feedbackGroup = createDOMElement('div', { class: 'form-group' }, feedbackDiv);

    const submitButton = createDOMElement('input', {
      type: 'submit',
      class: 'btn btn-primary btn-block',
      value: 'Sign up',
      id: 'signUp',
    });

    const signUpForm = createDOMElement('div', { class: 'dropdown-menu action-form' }, signText, emailGroup, userNameGroup, passwordGroup, rPasswordGroup, feedbackGroup, submitButton);
    this.signUpDropdown = createDOMElement('div', { class: 'nav-item dropdown', id: 'signUpForm' }, signUpLink, signUpForm);

    return this.signUpDropdown;
  }

  renderFooter() {
    const rsLogo = createDOMElement('img', { class: 'rs-logo', src: 'assets/images/rs_school_js.svg', alt: 'RsSchool logo' });
    const rsSchool = createDOMElement('a', { class: 'rs-logo', href: 'https://rs.school/js/' }, rsLogo);

    const copyRight = createDOMElement('div', { class: 'footer-year' }, `CloneJs - ${new Date().getFullYear()}`);

    const authors = createDOMElement('div', { class: 'authors mt-1 mb-1' }, this.createAuthorLink('Aliaksei Yeliseyeu', '6ygga'),
      this.createAuthorLink('Dzmitry Astapenka', 'dmitryastapenko'),
      this.createAuthorLink('Yauheni Marynovich', 'zhenyamarinovich'),
      this.createAuthorLink('Raman Novikau', 'ramannovikau'));

    this.footer = createDOMElement('footer', { class: 'footer' }, rsSchool, copyRight, authors);
    document.body.appendChild(this.footer);
  }

  createAuthorLink(name, git) {
    const gitImg = createDOMElement('img', { src: 'assets/images/github.svg', class: 'github-logo', alt: 'github-logo' });
    const authorLink = createDOMElement('a', { class: 'author-link', href: `https://github.com/${git}` }, gitImg, `${name}`);
    return authorLink;
  }
}
