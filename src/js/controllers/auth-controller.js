import UserAuth from '../models/user-auth';
import AuthView from '../views/auth-view';

export class AuthController {
  constructor() {
    this.userAuth = new UserAuth();
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
      this.authView.displayUserNavBar(data);
    });

    this.userAuth.on('loginError', (error) => {
      this.authView.showLoginError(error);
    });

    this.userAuth.on('userLogout', () => {
      this.authView.displayAuthNavBar();
    });

    this.userAuth.on('signUpError', (error) => {
      this.authView.showRegisteringError(error);
    });

    this.userAuth.logInStorage();
  }
}
