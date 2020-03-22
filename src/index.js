import { App } from "./app.js";
import { Shadow, initApp } from "../index.js";

let Entry = new Shadow("entry-point", {
  template: self => /*html*/ `
    <div> 
      <div id="my-app"> 
        <my-app> </my-app> 
        <my-app> </my-app> 
      </div>
    </div>
  `
});

initApp("#app", Entry, document);
