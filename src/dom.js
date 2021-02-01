window.dom = {
  create(string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },
  before(node, newNode) {
    node.parentNode.insertBefore(newNode, node);
  },
  after(node, newNode) {
    node.parentNode.insertBefore(newNode, node.nextSibling);
  },
  append(parent, child) {
    parent.appendChild(child);
  },
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  empty(node) {
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(x));
      x = node.firstChild;
    }
    return array;
  },
  attr(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  text(node, string) {
    if (arguments.length === 2) {
      node.innerText = string;
    } else if (arguments.length === 1) {
      return node.innerText;
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(test,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === String) {
        // dom.style(test,'color')
        return node.style.name;
      } else if (name instanceof Object) {
        for (let key in name) {
          // dom.style(test,{color:'red'})
          node.style[key] = name[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(dom.parent(node).children).filter((y) => y !== node);
  },
  next(node) {
    let x = node.nextSibling;
    while (x && x !== 1) {
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.nextSibling;
    while (x && x !== 1) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn(nodeList[i]);
    }
  },
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
