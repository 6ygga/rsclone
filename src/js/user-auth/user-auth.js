import { authUser, signUpUser } from '../services/user-service';

const { default: EventEmitter } = require('../EventEmitter');

const storageName = 'userData';

class UserAuth extends EventEmitter {
  constructor() {
    super();
    this.token = null;
    this.user = null;
    this.preference = null;
  }

  isAuthenticated() {
    return !!this.token;
  }

  getToken() {
    return this.token;
  }

  setCredentials(token, user, preference) {
    this.token = token;
    this.user = user;
    this.preference = preference;
  }

  logInStorage() {
    const userData = JSON.parse(localStorage.getItem(storageName));
    if (userData && userData.token) {
      this.setCredentials(userData.token, userData.name, userData.preference);
      this.emit('userLogin', userData);
    }
  }

  async logIn(userData) {
    try {
      const response = await authUser(userData);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error');
      }

      this.setCredentials(data.token, data.name, data.preference);
      localStorage.setItem(storageName, JSON.stringify(data));
      this.emit('userLogin', data);
    } catch (error) {
      this.emit('loginError', error);
    }
  }

  logOut() {
    this.setCredentials(null, null, null);
    localStorage.removeItem(storageName);
    this.emit('userLogout');
  }

  async signUp(userData) {
    try {
      const response = await signUpUser(userData);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.status || 'Error');
      }
      this.logIn(userData);
    } catch (error) {
      this.emit('signUpError', error);
    }
  }
}

export const userAuth = new UserAuth();
