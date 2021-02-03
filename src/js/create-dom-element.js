export default function createDOMElement(type, attributes, ...items) {
  const element = document.createElement(type);

  Object.keys(attributes).forEach((e) => {
    element.setAttribute(e, attributes[e]);
  });
  items.forEach((item) => {
    if (typeof item === 'string') {
      element.appendChild(document.createTextNode(item));
    } else {
      element.appendChild(item);
    }
  });

  return element;
}
