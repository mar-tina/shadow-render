import { App } from "./app.js";
import { Shadow, initApp } from "../index.js";

let Entry = new Shadow("entry-point", {
  template: /*html*/ `
    <div> 
      <div id="my-app"> 
        <my-app> </my-app> 
        <my-app> </my-app> 
      </div>
    </div>
  `
});

let entrydiv = document.createElement("div");
entrydiv.innerHTML = `<div> <div id="my-app"> ${App} </div> </div>`;

initApp("#app", Entry, document);
