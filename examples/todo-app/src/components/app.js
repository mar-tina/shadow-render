import { html, createShadowElement } from "../../../../src/core.js";
import { todoItem } from "./appStyle.js";

let Myapp = createShadowElement({
  state: {
    name: "Welcome to the shadows",
    todos: [
      {
        id: "todo-one",
        name: "TODO ONE"
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
      args.ctx.state.todo = {
        name: e.target.value,
        id: e.target.value
      };
    },

    deleteTodo: (e, args) => {
      let newTodos = args.ctx.state.todos.filter(
        item => item.id !== args.bound
      );
      args.ctx.setState({
        todos: newTodos
      });
    },

    handleBtnClick: (e, args) => {
      args.ctx.setState({
        todos: [...args.ctx.state.todos, args.ctx.state.todo]
      });
    }
  },

  lifecycle: {
    onMount: ctx => {
      console.log("mounted", ctx.state);

      setTimeout(() => {
        ctx.setState({
          name: "I am now mounted"
        });
      }, 3000);
    }
  },

  template: state => {
    return html(`
        <input id="todo-input" @oninput="handleInput" /> 

        <div> 
          <div>
            <button id="state-change" @onclick="handleBtnClick" > SEE STATE CHANGE </button>
          </div>
        </div>
        

        ${state.todos.map(
          (x, { y = "handleTodoClick" }) =>
            `<div style="display:grid; grid-template-columns: auto 100px; g">
              <div style="${todoItem}" id=${x.id} @onclick=${y}  bind=${
              x.id
            }>  ${x.name} </div> 
                
                <svg id=${x.id + "del-todo"} @onclick="deleteTodo"  bind=${
              x.id
            } xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
            `
        )}

    `);
  }
});

customElements.define("main-app", Myapp);
