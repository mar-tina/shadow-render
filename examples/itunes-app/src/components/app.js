import { html, createShadowElement } from "../../../../src/core.js";

let Myapp = createShadowElement({
  state: {
    name: "Welcome to the shadows",
    todos: [
      {
        id: "todo-one",
        name: "TODO ONE"
      },
      {
        id: "todo-two",
        name: "TODO TWO"
      }
    ]
  },

  methods: {
    testMethod: ctx => {
      console.log("Inside test method", ctx);
    },

    handleClick: (e, ctx) => {
      console.log("I am being called", e, ctx);
    },

    handleTodoClick: e => {
      console.log("CLICKING TODO", e);
    }
  },

  lifecycle: {
    onMount: ctx => {
      console.log("mounted", ctx);
    }
  },

  template: state => {
    return html(`
        <div @onclick="handleClick" default=${false} id="main-app">Inside main app ${
      state.name
    }</div>
        
        ${state.todos.map(
          x => `<div @onclick="handleTodoClick" id=${x.id}> ${x.name} </div>`
        )}
    `);
  }
});

customElements.define("main-app", Myapp);
