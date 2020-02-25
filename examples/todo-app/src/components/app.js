import { html, createShadowElement } from "../../../../src/core.js";
import {
  todoItem,
  mainContainer,
  submitButton,
  inputTodo,
  todoItems
} from "./appStyle.js";
import { sanitize } from "./utils.js";
import "./todolist.js";
import "./todo.js";

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
