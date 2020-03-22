const parseRange = document.createRange();
const parse = Range.prototype.createContextualFragment.bind(parseRange);

export let initApp = (id, content, doc) => {
  let docref = doc.body.querySelector(id);
  docref.appendChild(content);
};

export function Shadow(label, args) {
  let parsedTemplate = parse(args.template);
  let VDomNodes = {};

  console.log("All the args", args);

  let template = document.createElement("div");
  template.appendChild(parsedTemplate);

  customElements.define(
    label,
    class extends HTMLElement {
      connectedCallback() {
        !!args.onMount ? args.onMount() : {};
        this._shadowRoot.appendChild(template.cloneNode(true));
        recursivelyCheckForNodes(this._shadowRoot, VDomNodes);
        this.setAttributes();
      }
      constructor() {
        super();
        this._shadowRoot = this.attachShadow({
          mode: "open"
        });
        console.log("Running in constructor");
      }

      setAttributes() {
        for (var key in VDomNodes) {
          if (VDomNodes.hasOwnProperty(key)) {
            if (!!VDomNodes[key].parent) {
              // Get element in template and modify element
              let el = this._shadowRoot.querySelector(`#${key}`);
              let attr;
              !!el ? (attr = el.attributes) : (attr = {});

              for (var prop in attr) {
                if (!!attr[prop].nodeName) {
                  if (attr[prop].nodeName.startsWith("@")) {
                    attr[prop].nodeName === "bind";
                    let f = args.methods[`${attr[prop].nodeValue}`];
                    el.addEventListener(`${attr[prop].nodeName.substr(1)}`, e =>
                      f(e)
                    );
                    el.removeAttribute(`${attr[prop].nodeName}`);
                  }
                }
              }
            }
          }
        }
      }
    }
  );

  return template;
}

function recursivelyCheckForNodes(node, allNodes) {
  let DomNode = {};
  node.id == "" ? (node.id = randStr() + uuid(8)) : {};
  DomNode[`${node.id}`] = {};

  !allNodes.hasOwnProperty(Object.keys(DomNode)[0])
    ? (allNodes[`${Object.keys(DomNode)[0]}`] = {})
    : {};

  allNodes[`${Object.keys(DomNode)[0]}`][`parent`] = node.parentNode;
  allNodes[`${Object.keys(DomNode)[0]}`][`attributes`] = node.attributes;

  if (node.hasChildNodes() == true) {
    for (var i = 0; i < node.children.length; i++) {
      recursivelyCheckForNodes(node.children[i], allNodes);
    }
  }
}

/*** HOOKS Implementation */
export function useState(state) {
  const handler = {
    get(target, property, receiver) {
      return Reflect.get(target, property, receiver);
    },

    set(target, property, value, receiver) {
      return Reflect.set(target, property, value);
    }
  };

  let proxyObject = new Proxy(state, handler);

  let setState = createStateHandler(proxyObject);
  return [state, setState];
}

let createStateHandler = proxy => state => {
  for (var key in proxyObject) {
    if (state.hasOwnProperty(key)) {
      proxy[key] = state[key];
    }
  }
};

// Implementation of the Javascript proxy object

/**** HELPERS  *****/
// A package by: lukeed Github Repository link: https://github.com/lukeed/uid/blob/master/src/index.js
var IDX = 36,
  HEX = "";
while (IDX--) HEX += IDX.toString(36);

function uuid(len) {
  var str = "",
    num = len || 11;
  while (num--) str += HEX[(Math.random() * 36) | 0];
  return str;
}

function randStr() {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5);
}
