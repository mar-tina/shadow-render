export let Shadow;

(function(Shadow) {
  (function(Base) {
    let BaseElement = (function() {
      function BaseElement() {}
      BaseElement.prototype.clone = function(state) {

        let clone = class extends HTMLElement {
          constructor() {
            super();
            this.state = state;

            const renderTemplate = document.createElement("template");
            this._shadowRoot = this.attachShadow({
              mode: "open"
            });

            let newTemplate = html`
              <div>Something is here ${this.state.name}</div>
            `;

            renderTemplate.innerHTML = newTemplate.doc;
            this._shadowRoot.appendChild(
              renderTemplate.content.cloneNode(true)
            );

            return this;
          }
        };
        for (var attr in this) {
          console.log("the attr", attr);
          clone[attr] = this[attr];
        }
        return clone;
      };
      return BaseElement;
    })();
    Base.BaseElement = BaseElement;
  })(Shadow.Base || (Shadow.Base = {}));
})(Shadow || (Shadow = {}));

console.log("The unl", Shadow.Base.BaseElement.prototype.clone);

export let ShadowElement = args => {
  let newClass = new Unf.Base.BaseElement.prototype.clone(args);

  customElements.define("class-one", newClass);
};
