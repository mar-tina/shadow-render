import { html, createShadowElement } from "../../../../src/core.js";
import "./todo.js";
import "./todolist.js";

import { routes } from "./routes.js";

export function createNewRoute(args) {
  let AppRouter = createShadowElement({
    state: {
      path: args.path
    },

    lifecycle: {
      onMount: ctx => {
        // console.log("Router mounted", window.location.hash);
      }
    },

    template: ctx => {
      return html(`
                    ${args.component}
                `);
    }
  });

  customElements.define(args.label, AppRouter);
}

function initRoutes() {
  routes.forEach(item => {
    createNewRoute(item);
  });
}

initRoutes();
