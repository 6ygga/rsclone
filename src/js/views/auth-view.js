import { elementFactory, clearElement } from '../helpers/dom-elements-helpers';

const { default: EventEmitter } = require('../EventEmitter');

class AuthView extends EventEmitter {
  constructor() {
    super();
    this.loginButton = document.getElementById('login');
    this.signUpButton = document.getElementById('signUp');
    this.loginForm = document.getElementById('loginForm');
    this.signUpForm = document.getElementById('signUpForm');

    this.setUpLocalListeners();
  }

  displayAuthNavBar() {
    const authControls = document.getElementById('authControls');
    clearElement(authControls);
    authControls.appendChild(this.loginForm);
    authControls.appendChild(this.signUpForm);
  }

  displayUserNavBar(data) {
    const authControls = document.getElementById('authControls');
    clearElement(authControls);

    const dropdownDivider = elementFactory('div', { class: 'dropdown-divider' }, '');
    const logoutItem = elementFactory('div', { class: 'dropdown-item', id: 'logout', href: '#' }, 'Logout');
    const AccountItem = elementFactory('div', { class: 'dropdown-item', href: '#' }, 'Account');
    const dropdownMenu = elementFactory('div', { class: 'dropdown-menu user-form' }, AccountItem, dropdownDivider, logoutItem);

    const aButton = elementFactory('a', { class: 'btn btn-primary dropdown-toggle sign-up-btn', 'data-toggle': 'dropdown' }, `${data.name}`);
    const btnGroup = elementFactory('div', { class: 'nav-item dropdown' }, aButton, dropdownMenu);

    const navItemDropdown = elementFactory('div', { class: 'nav-item dropdown' }, btnGroup);

    logoutItem.onclick = () => {
      this.emit('clickLogout');
    };

    authControls.appendChild(navItemDropdown);
  }

  showLoginError(error) {
    const errorBlock = this.loginForm.querySelector('.invalid-feedback');
    errorBlock.textContent = `${error}`;
    errorBlock.classList.add('d-block');
    this.loginForm.querySelector('.username').classList.add('is-invalid');
    this.loginForm.querySelector('.password').classList.add('is-invalid');
  }

  showRegisteringError(error) {
    const errorBlock = this.signUpForm.querySelector('.invalid-feedback');
    errorBlock.textContent = `${error}`;
    errorBlock.classList.add('d-block');
    this.signUpForm.querySelector('.email').classList.add('is-invalid');
    this.signUpForm.querySelector('.username').classList.add('is-invalid');
    this.signUpForm.querySelector('.password').classList.add('is-invalid');
    this.signUpForm.querySelector('.r-password').classList.add('is-invalid');
  }

  setUpLocalListeners() {
    this.loginButton.addEventListener('click', () => {
      const errorBlock = this.loginForm.querySelector('.invalid-feedback');
      const nameInput = this.loginForm.querySelector('.username');
      const passwordInput = this.loginForm.querySelector('.password');
      const name = nameInput.value;
      const password = passwordInput.value;

      errorBlock.classList.remove('d-block');
      nameInput.classList.remove('is-invalid');
      passwordInput.classList.remove('is-invalid');

      this.emit('clickLogin', { name, password });
    });

    this.signUpButton.addEventListener('click', () => {
      const errorBlock = this.signUpForm.querySelector('.invalid-feedback');
      const emailInput = this.signUpForm.querySelector('.email');
      const nameInput = this.signUpForm.querySelector('.username');
      const passwordInput = this.signUpForm.querySelector('.password');
      const repeatPasswordInput = this.signUpForm.querySelector('.r-password');
      const email = emailInput.value;
      const name = nameInput.value;
      const password = passwordInput.value;
      const repeatPassword = repeatPasswordInput.value;

      if (password !== repeatPassword) {
        this.showRegisteringError('password confirmation does not match');
        return;
      }

      errorBlock.classList.remove('d-block');
      emailInput.classList.remove('is-invalid');
      nameInput.classList.remove('is-invalid');
      passwordInput.classList.remove('is-invalid');
      repeatPasswordInput.classList.remove('is-invalid');

      this.emit('clickSignup', { email, name, password });
    });

    document.querySelector('.action-buttons .dropdown-menu').addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}

export default AuthView;
