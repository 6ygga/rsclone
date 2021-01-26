import { userAuthModel } from './user-auth-model';
import AuthView from './auth-view';

export class AuthController {
  constructor() {
    this.userAuth = userAuthModel;
    this.authView = new AuthView();

    this.authView.on('clickLogin', (user) => {
      this.userAuth.logIn(user);
    });

    this.authView.on('clickLogout', () => {
      this.userAuth.logOut();
    });

    this.authView.on('clickSignup', (data) => {
      this.userAuth.signUp(data);
    });

    this.userAuth.on('userLogin', (data) => {
      this.authView.renderUserNavBar(data);
    });

    this.userAuth.on('loginError', (error) => {
      this.authView.showLoginError(error);
    });

    this.userAuth.on('userLogout', () => {
      this.authView.renderAuthNavBar();
    });

    this.userAuth.on('signUpError', (error) => {
      this.authView.showRegisteringError(error);
    });

    this.userAuth.logInStorage();
  }
}
