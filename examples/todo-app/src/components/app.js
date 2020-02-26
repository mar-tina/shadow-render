import { html, createShadowElement } from "../../../../index.js";
import { mainContainer } from "./appStyle.js";
import "./todolist.js";
import "./todo.js";
// import "./counter.js";

let Myapp = createShadowElement({
  lifecycle: {
    onMount: () => {
      console.log("Mounted App");
    }
  },

  template: ctx => {
    return html(`
        <div style="${mainContainer}">
          <p> TODOS </p>
          <todo-el> </todo-el>
          <todo-list> </todo-list>
        </div>`);
  }
});

customElements.define("main-app", Myapp);
