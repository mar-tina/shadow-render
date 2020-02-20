import { init, html } from "../../../src/core.js";

import "./components/app.js";

let newtemplate = html(
  `<div>
    <p>Welcome to the page</p>
    <div>
      <main-app> </main-app>
    </div>
  </div>`
);

const myTemplate = () => newtemplate;

init("#app", myTemplate());
