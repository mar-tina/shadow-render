export const html = (strings, ...args) => ({
  doc: strings.reduce(
    (acc, currElement, index) => acc + currElement + (args[index] || ""),
    ""
  )
});

/**
 * Initializes the application .
 * @param {string} selector
 * @param {html-template} component
 * @returns {void}
 */
export let init = function(selector, component) {
  let el = document.querySelector(selector);
  el.attachShadow({
    mode: "open"
  });

  el.shadowRoot.innerHTML = component.doc;
};

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
      BaseElement.prototype.clone = function(args) {
        let clone = class extends HTMLElement {
          connectedCallback() {
            bindCycle(this, args.lifecycle.onMount);
          }
          constructor() {
            super();
            this.state = args.state;
            this.methods = args.methods;

            const renderTemplate = document.createElement("template");
            this._shadowRoot = this.attachShadow({
              mode: "open"
            });

            renderTemplate.innerHTML = args.template(
              this.state,
              this.methods
            ).doc;
            this._shadowRoot.appendChild(
              renderTemplate.content.cloneNode(true)
            );

            return this;
          }
        };

        // for (var attr in this) {
        //   clone[attr] = this[attr];
        //   console.log("the attr", attr);
        // }

        return clone;
      };
      return BaseElement;
    })();
    Base.BaseElement = BaseElement;
  })(Shadow.Base || (Shadow.Base = {}));
})(Shadow || (Shadow = {}));

export let createShadowElement = args => {
  let newClass = new Shadow.Base.BaseElement.prototype.clone(args);

  return newClass;
};
