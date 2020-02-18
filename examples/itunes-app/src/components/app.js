import { html, createShadowElement } from "../../../../src/core.js";

let Myapp = createShadowElement({
  state: {
    name: "Welcome to the shadows"
  },

  methods: {
    testMethod: () => {
      console.log("Inside test method", this);
    }
  },

  lifecycle: {
    onMount: ctx => {
      console.log("mounted", ctx);
    }
  },

  template: (state, methods) => {
    return html`
      <div>Inside main app ${state.name}</div>
      <div>${console.log("The available methods", methods)}</div>
    `;
  }
});

customElements.define("main-app", Myapp);
