import { html, createShadowElement } from "../../../../src/core.js";

let Myapp = createShadowElement({
  state: {
    name: "Martina Khaemba"
  },
  
  template: state => {
    return html`
      <div>Inside main app ${state.name}</div>
    `;
  }
});

console.log("The app", Myapp);

customElements.define("main-app", Myapp);
