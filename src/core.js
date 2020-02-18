export const html = (strings, ...args) => ({
  doc: strings.reduce(
    (acc, currElement, index) => acc + currElement + (args[index] || ""),
    ""
  )
});

export let Shadow;

(function(Shadow) {
  (function(Base) {
    let BaseElement = (function() {
      function BaseElement() {}
      BaseElement.prototype.clone = function(args) {
        let clone = class extends HTMLElement {
          constructor() {
            super();
            this.state = args.state;

            const renderTemplate = document.createElement("template");
            this._shadowRoot = this.attachShadow({
              mode: "open"
            });

            renderTemplate.innerHTML = args.template(this.state).doc;
            this._shadowRoot.appendChild(
              renderTemplate.content.cloneNode(true)
            );

            return this;
          }
        };

        // for (var attr in this) {
        //   console.log("the attr", attr);
        //   clone[attr] = this[attr];
        // }

        return clone;
      };
      return BaseElement;
    })();
    Base.BaseElement = BaseElement;
  })(Shadow.Base || (Shadow.Base = {}));
})(Shadow || (Shadow = {}));

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

export let createShadowElement = args => {
  let newClass = new Shadow.Base.BaseElement.prototype.clone(args);

  return newClass;
};


