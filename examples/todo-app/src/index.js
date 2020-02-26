import { html, init } from "../../../index.js";

import "./components/app.js";

let newtemplate = html(
  `<div>  
     <main-app> </main-app> 
  </div>`
);

const myTemplate = () => newtemplate;

init("#app", myTemplate());
