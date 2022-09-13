const insertHTML = (markup, element, position = "beforeend") => {
  element.insertAdjacentHTML(position, markup);
};

const replaceHTML = (markup, element, position = "beforeend") => {
  while(element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  };
  element.insertAdjacentHTML(position, markup);
};

const clear = (element) => {
  while(element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  };
};

const clearFrom = (startNode) => {
  while(startNode.nextElementSibling) {
    startNode.nextElementSibling.remove();
  };
};

const delegate = (element, selector, eventName, handler) => {
  element.addEventListener(eventName, event => {
    if(event.target.matches(selector)) handler(event, element);
  });
};

const addClass = (target, className) => {
  target.classList.add(className);
};

const removeAllClass = (allNodes, className) => {
  allNodes.forEach(node => node.classList.remove(className));
};

const addAllClass = (allNodes, className) => {
  allNodes.forEach(node => node.classList.add(className));
};

export {
  insertHTML,
  replaceHTML,
  clearFrom,
  clear,
  delegate,
  addClass,
  addAllClass,
  removeAllClass
}