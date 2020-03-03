// Solution from https://stackoverflow.com/questions/10585029/parse-an-html-string-with-js
const parseRange = document.createRange();
export const html = Range.prototype.createContextualFragment.bind(parseRange);

/**
 * Initializes the application .
 * @param {string} selector
 * @param {html-template} component
 * @param {doc} document - Passing in the document for testing purposes
 * @returns {void}
 */
export let init = function(selector, component, doc) {
  let el = {};
  if (doc !== undefined) {
    el = doc.querySelector(selector);
  } else {
    el = document.querySelector(selector);
  }
  el.attachShadow({
    mode: "open"
  });

  el.shadowRoot.appendChild(component);
};

/**
 *  Add listener to elements
 * @param {*} type - The type of event to listen to
 * @param {*} elem  - The element that the listener is being added to
 * @param {*} f - the callback function to run when the event is fired on the element
 * @param {*} args - The arguments being passed to the callback function. The args object contains the 'self' -- current execution ctx
 */
let addListener = (type, elem, f, args) => {
  elem[`${type}`] = e => {
    if (typeof args !== undefined) {
      if (args.defaultAction === "true") {
        e.preventDefault();
      }
    }
    f(e, args);
  };
};

/**
 * Same as the above addListener but specifically for the global window object
 * @param {*} type
 * @param {*} elem
 * @param {*} f
 * @param {*} args
 */
let addWindowListener = (type, elem, f, args) => {
  elem[`${type}`] = e => {
    args.location = elem.location.hash;
    f(e, args);
  };
};

//Solution from MDN DOCS
function is_all_ws(nod) {
  // Use ECMA-262 Edition 3 String and RegExp features
  return !/[^\t\n\r ]/.test(nod.textContent);
}

/**
 *
 * @param {*} e - listener passed to the addWindowListener function. calls the matchPathToWindowLocation
 * @param {*} args - Contains the 'self', path , and location parameters
 */
function renderIfPathMatched(e, args) {
  matchPathToWindowLocation(args.ctx, args.path, args.location);
}

/**
 * It matches the current router element path and renders if it matches the global window.location.hash
 * @param {*} ctx - 'self' - current execution context
 * @param {*} path - the path that the current element is supposed to match to trigger render
 * @param {*} location - the global window.location.hash
 */
function matchPathToWindowLocation(ctx, path, location) {
  if (path !== undefined) {
    path = path.substr(1);
    if (path === location) {
      ctx._render();
      return true;
    }
    ctx._shadowRoot.innerHTML = "";
    return false;
  }
}
/**
 * Passes the 'this' object to all the executing functions when node is mounted or unmounted
 * @param {THIS} elem - object that has reference to the current execution context
 * @param {function} f - onmount function to be called in the connectedCallback function
 */
let bindCycle = (elem, f) => {
  if (typeof f !== "undefined") {
    f(elem);
  } else {
    console.log("Onmount function is undefined");
  }
};

export let Shadow;

(function(Shadow) {
  (function(Base) {
    let BaseElement = (function() {
      function BaseElement() {}
      BaseElement.prototype.clone = function(args, provider) {
        let clone = class extends HTMLElement {
          connectedCallback() {
            bindCycle(this, args.lifecycle.onMount);
          }
          constructor() {
            super();
            this.state = args.state;
            this.methods = args.methods;
            this.actions = args.actions;
            this.provider = provider;

            this.nestedNodes = {
              attrNodes: []
            };

            this.renderTemplate = document.createElement("template");

            this._shadowRoot = this.attachShadow({
              mode: "open"
            });

            //clone the window object
            this.localWindow = window;

            this.path = this.getAttribute("path");
            this.type = this.getAttribute("type");

            let pathArgs = {
              ctx: this,
              path: this.path,
              location: this.localWindow.location.hash
            };

            if (this.type !== undefined && this.type === "router") {
              matchPathToWindowLocation(
                this,
                this.path,
                this.localWindow.location.hash
              );
            } else {
              this._render();
            }
            addWindowListener(
              "onpopstate",
              this.localWindow,
              renderIfPathMatched,
              pathArgs
            );
          }

          setState(props) {
            for (var key in props) {
              if (props.hasOwnProperty(key)) {
                this.state[key] = props[key];
              }
            }
            // clears the current element content and rerenders it afresh with new state variables
            var i = 0;
            for (; i < this._shadowRoot.childNodes.length; ) {
              this._shadowRoot.removeChild(this.shadowRoot.childNodes[i]);
              i = +1;
            }
            this._render();
          }

          // clean function removes whitespace in the element and unnecessary characters
          clean(node) {
            var i = 0;
            for (; i < node.childNodes.length; ) {
              if (
                node.childNodes[i].nodeType === 8 ||
                (node.childNodes[i].nodeType === 3 &&
                  is_all_ws(node.childNodes[i]))
              ) {
                node.removeChild(node.childNodes[i]);
              } else if (node.childNodes[i].nodeType === 1) {
                this.clean(node.childNodes[i]);
              }
              i += 1;
            }
            return node;
          }

          // Renders the actual element
          _render() {
            // creates a new template and passes it the 'ctx' object == 'this'
            let newTemplate = args.template(this);
            let tempDiv = document.createElement("div");

            tempDiv.appendChild(newTemplate);
            this.renderTemplate.innerHTML = tempDiv.innerHTML;

            tempDiv.innerHTML = "";
            let cloned = this.clean(
              this.renderTemplate.content.cloneNode(true)
            );

            tempDiv.appendChild(cloned);
            this._shadowRoot.appendChild(tempDiv.cloneNode(true));
            //set attributes after elements are mounted to DOM
            this._handleAttributes(this._shadowRoot.childNodes[0].childNodes);
          }

          // calls the addEventListener for the attributes
          setPassedAttribute = item => {
            let attrArray = Array.from(item.attributes);

            var allattributes = new Map();
            attrArray.map(attr => {
              allattributes.set(`${attr.nodeName}`, `${attr.nodeValue}`);
            }, "");
            let component = this._shadowRoot.getElementById(
              allattributes.get("id")
            );

            for (let [key, value] of allattributes.entries()) {
              // only runs add  listener on attributes that are prepended by '@'
              if (key.startsWith("@")) {
                key = key.substr(1);
                addListener(`${key}`, component, this.methods[`${value}`], {
                  defaultAction: allattributes.get("default"),
                  ctx: this,
                  bound: allattributes.get("bind")
                });
              }
            }
          };

          _handleAttributes(newTemplate) {
            for (var node of newTemplate) {
              this.recursivelyCheckForNodes(node, "attrNodes");
            }
            // Because as a rule all elements with event listeners must have an id. It only sets the Listener attribute
            // on the nested nodes that have an id attribute
            let filteredNodes = this.nestedNodes[`attrNodes`].filter(
              elem => elem.id !== undefined && elem.id !== ""
            );
            //empty nested nodes after every page refresh
            this.nestedNodes[`attrNodes`] = [];
            filteredNodes.forEach(this.setPassedAttribute);
          }

          /**
           * Looks through the nodes pressent in the shadow root and creates an object that holds
           * all nodes so that the handleAttributes element is able to setAttributes for all the available
           * nested nodes.
           */
          recursivelyCheckForNodes = (node, type) => {
            if (node.hasChildNodes()) {
              for (var i = 0; i < node.childNodes.length; i++) {
                this.nestedNodes[`${type}`].push(node);
                this.recursivelyCheckForNodes(node.childNodes[i], type);
              }
            } else {
              this.nestedNodes[`${type}`].push(node);
            }
          };
        };
        return clone;
      };
      return BaseElement;
    })();
    Base.BaseElement = BaseElement;

    let ContextProvider = (function() {
      function ContextProvider() {
        this.providers = {};
      }

      ContextProvider.prototype.addNewContext = function(label, data) {
        // Checks if the new context exists if not it creates a new empty object to avoid failing
        if (!this.providers.hasOwnProperty(label)) {
          this.providers[`${label}`] = {};
        }
        let self = this.providers[`${label}`];
        self.data = data;
        self.subs = [];

        // Implementation of the Javascript proxy object
        const handler = {
          get(target, property, receiver) {
            self.subs.forEach(item => {
              if (item.listenOn === "get") {
                item.f(property, target[property]);
              }
            });
            return Reflect.get(target, property, receiver);
          },

          set(target, property, value, receiver) {
            let setResult = Reflect.set(target, property, value);
            self.subs.forEach(item => {
              if (item.listenOn === "set") {
                item.f(property, target[property]);
              }
            });
            return setResult;
          }
        };

        // Returns the ctx to the elements calling publish to allow the elements
        // to manipulate the object being watched.
        self.proxyObject = new Proxy(self.data, handler);
        return self;
      };

      ContextProvider.prototype.subToContext = function(label, callback) {
        let self = this;
        if (!this.providers[`${label}`]) {
          throw new Error("Provider does not exist");
        } else {
          this.providers[`${label}`].subs.push(callback);
          // Returns the ctx to the elements calling subscribe to allow the elements
          // to manipulate the object being watched.
          return self;
        }
      };
      return ContextProvider;
    })();

    Base.ContextProvider = new ContextProvider();
  })(Shadow.Base || (Shadow.Base = {}));
})(Shadow || (Shadow = {}));

let globalProvider = Shadow.Base.ContextProvider;

export let createShadowElement = args => {
  let newClass = new Shadow.Base.BaseElement.prototype.clone(
    args,
    globalProvider
  );
  return newClass;
};
