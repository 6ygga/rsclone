export const clearElement = (el) => {
  const element = el;
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
};
