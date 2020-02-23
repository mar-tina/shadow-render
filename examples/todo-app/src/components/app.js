import { html, createShadowElement } from "shadow-render";
import {
  todoItem,
  mainContainer,
  submitButton,
  inputTodo,
  todoItems
} from "./appStyle.js";
import { sanitize } from "./utils.js";

let Myapp = createShadowElement({
  state: {
    todos: []
  },

  methods: {
    handleInput: (e, args) => {
      let sanitizedInput = sanitize(e.target.value);
      let parsedID = sanitizedInput.replace(/\s+/g, "-").toLowerCase();

      args.ctx.state.todo = {
        name: sanitizedInput,
        id: parsedID,
        done: false
      };
    },

    markAsDone: (e, args) => {
      args.ctx.state.todos.map(item => {
        if (item.id === args.bound) {
          item.done = !item.done;
        }
      });

      args.ctx.setState({
        todos: args.ctx.state.todos
      });
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
    },

    handleEdit: (e, args) => {
      args.ctx.state.todos.map(item => {
        if (item.id === args.bound) {
          item.name = sanitize(e.target.innerHTML);
        }
      });
    }
  },
  lifecycle: {
    onMount: ctx => {
      console.log("mounted", ctx.state);
    }
  },

  template: ctx => {
    return html(`
        <div style="${mainContainer}">
        <p> TODOS </p>
        <input style="${inputTodo}" id="todo-input" @oninput="handleInput" /> 
          <div> 
            <button style="${submitButton}" id="state-change" @onclick="handleBtnClick" > Submit Todo </button>
          </div>

        <div style="${todoItems}" id="todoList"> ${todoList(ctx.state)} </div>
        </div>`);
  }
});

let todoList = state => {
  return `${state.todos
    .map(
      x =>
        ` <div @oninput="handleEdit" contentEditable=${true} style="${todoItem}" id=${x.id +
          "none"}  bind=${x.id}>  ${x.name} </div> 
            <div style="text-align:center;"> 
            <!-- Append a randomized string to svg ID to avoid more than one element sharing the same id -->
            <svg id=${x.id + "rand"} @onclick="deleteTodo"  bind=${
          x.id
        } xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>

            <!-- Append a randomized string to svg ID to avoid more than one element sharing the same id -->
            <svg id=${x.id + "abs"} @onclick="markAsDone" bind=${
          x.id
        }  xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke=${
          x.done ? "green" : "black"
        } stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>`
    )
    .join("")}`;
};

customElements.define("main-app", Myapp);
