import { html, createShadowElement } from "../../../../src/core.js";

let Myapp = createShadowElement({
  state: {
    name: "Welcome to the shadows"
  },

  template: state => {
    return html`
      <div>Inside main app ${state.name}</div>
    `;
  }
});

customElements.define("main-app", Myapp);
