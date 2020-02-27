import { html, createShadowElement } from "../../../../index.js";
import { mainContainer, submitButton, inputTodo } from "./appStyle.js";
import { sanitize } from "./utils.js";
import "./todolist.js";

let TodoApp = createShadowElement({
  state: {
    todos: []
  },

  lifecycle: {
    onMount: ctx => {
      let res = ctx.actions.subscribe(ctx, ctx.provider);
      ctx.state.proxyObject = res.providers["todoCtx"].proxyObject;
    }
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

    handleBtnClick: (e, args) => {
      let newTodos = [...args.ctx.state.proxyObject.todos, args.ctx.state.todo];
      args.ctx.state.proxyObject.todos = newTodos;
    }
  },

  actions: {
    subscribe: (self, contextProvider) => {
      let callback = {
        listenOn: "set",
        f: (property, args) => {
          if (property === "todos") {
            self.setState({
              todos: args
            });
          }
        }
      };
      try {
        return contextProvider.subToContext("todoCtx", callback);
      } catch (error) {
        console.log("Failed", error);
      }
    }
  },

  template: ctx => {
    return html(`
        <div style="${mainContainer}">
        <p> Add a Todo </p>
        <input style="${inputTodo}" id="todo-input" @oninput="handleInput" /> 
          <div> 
            <button style="${submitButton}" id="state-change" @onclick="handleBtnClick" > Submit Todo </button>
          </div>
        </div>`);
  }
});

customElements.define("todo-el", TodoApp);
