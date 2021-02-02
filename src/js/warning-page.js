export default class WarningPage {
  static createPage() {
    const warningMessage = document.createElement('div');
    warningMessage.classList.add('warning-message');
    warningMessage.innerHTML = 'sign up to see statistics';
    return warningMessage;
  }
}
