import { html, createShadowElement } from "../../../../index.js";

let CounterApp = createShadowElement({
  state: {
    counter: 0
  },

  lifecycle: {
    onMount: () => {
      console.log("Counter mounted");
    }
  },

  methods: {
    increment: (e, args) => {
      args.ctx.setState({
        counter: (args.ctx.state.counter += 1)
      });
    },

    decrement: (e, args) => {
      args.ctx.setState({
        counter: (args.ctx.state.counter -= 1)
      });
    }
  },

  template: ctx => {
    return html(`
            <p> ${ctx.state.counter}</p>
            <button default="${true}" id="increment-counter" @onclick="increment"> + </button>
            <button default="${true}" id="decrement-counter" @onclick="decrement"> - </button>
        `);
  }
});

customElements.define("counter-app", CounterApp);
