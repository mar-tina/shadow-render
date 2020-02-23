import { init, html } from "shadow-render";

import "./components/app.js";

let newtemplate = html(
  "<div>" + "<div> " + " <main-app> </main-app> " + "</div>" + "</div>"
);

const myTemplate = () => newtemplate;

init("#app", myTemplate());
