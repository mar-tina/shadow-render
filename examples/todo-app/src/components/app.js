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
    handleClick: (e, args) => {
      console.log("I am being called", e, args);
    },

    handleTodoClick: (e, args) => {
      console.log("CLICKING TODO", e, args);
    },

    handleInput: (e, args) => {
      console.log("Some input", e.target.value, args);
    },

    handleBtnClick: (e, args) => {
      args.ctx.setState({
        todos: [...args.ctx.state.todos, { name: "new todo", id: "new-one" }]
      });
    }
  },

  lifecycle: {
    onMount: ctx => {
      console.log("mounted", ctx.state);
      // ctx.state.name = "I am now mounted";

      setTimeout(() => {
        ctx.setState({
          name: "I am now mounted"
        });
      }, 3000);
    }
  },

  template: state => {
    return html(`
    
      <div id="main-app" bind="Something" @onclick="handleClick" default=${false} >Inside main app ${
      state.name
    }</div>
        <input id="todo-input" @oninput="handleInput" /> 

        <div> 
          <p id="first-nest"> First nest </p>
          <div>
            <button id="state-change" @onclick="handleBtnClick" > SEE STATE CHANGE </button>
          </div>
        </div>
        

        ${state.todos.map(
          (x, { y = "handleTodoClick" }) =>
            `<div id=${x.id} @onclick=${y}  bind=${x.id}>  ${x.name} </div>`
        )}

    `);
  }
});

customElements.define("main-app", Myapp);
