import { html, createShadowElement } from "../../../../index.js";
import { mainContainer, routeComponent } from "./appStyle.js";
import "./todolist.js";
import "./todo.js";
import "./router";

let Myapp = createShadowElement({
  state: {
    currentpath: ""
  },

  lifecycle: {
    onMount: ctx => {
      let res = ctx.actions.publish(ctx, ctx.provider);
      ctx.state.proxyObject = res.proxyObject;
    }
  },

  methods: {
    linkme: (e, args) => {
      if (!!args.bound) {
        window.location.hash = args.bound.substr(1);
      }
      //We just need to trigger a re-render
      args.ctx.setState({
        currentpath: window.location.hash
      });
    }
  },
  actions: {
    publish: (self, ctxProvider) => {
      let props = {
        todos: []
      };
      return ctxProvider.addNewContext("todoCtx", props);
    }
  },

  template: ctx => {
    return html(`
        <div style="${mainContainer}">
          <p> TODOS </p>
          <a @onclick="linkme" bind="/#home" id="home-link"> Home </a>
          <a @onclick="linkme" bind="/#away" id="away-link"> Todos </a>
        </div>
        <div style="${routeComponent}">
          <away-route type="router" path="/#away" > </away-route>
        </div>
        <div style="${routeComponent}">
          <home-route type="router" path="/#home" > </home-route>
        </div>
       
        `);
  }
});

customElements.define("main-app", Myapp);
