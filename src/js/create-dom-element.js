export default function createDOMElement(type, attributes, ...items) {
  const element = document.createElement(type);

  Object.entries(attributes).forEach((item) => {
    const [name, value] = item;

    element.setAttribute(name, value);
  });

  items.forEach((item) => {
    element.appendChild(item);
  });

  return element;
}
