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
    },

    handleInput: (e, ctx) => {
      console.log("Some input", e.target.value, ctx);
    }
  },

  lifecycle: {
    onMount: ctx => {
      console.log("mounted", ctx.state);
      ctx.state.name = "I am now mounted";
    }
  },

  template: state => {
    return html(`
        <div @onclick="handleClick" default=${false} id="main-app">Inside main app ${
      state.name
    }</div>

     <input @oninput="handleInput" id="todo-input"/> 
        
        ${state.todos.map(
          x => `<div @onclick="handleTodoClick" id=${x.id}> ${x.name} </div>`
        )}
    `);
  }
});

customElements.define("main-app", Myapp);
