import { App } from "./app.js";
import { Shadow, initApp } from "../index.js";

// Entry is not similar to other shadow elements
let Entry = new Shadow("entry-point", {
  template: self => /*html*/ `
    <div> 
        <my-app> </my-app> 
        <my-app> </my-app> 
    </div>
  `
});

initApp("#app", Entry, document);
