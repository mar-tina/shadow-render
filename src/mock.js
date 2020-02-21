import { init } from "./core.js";

export let mockDocument = template => {
  let doc = document.implementation.createHTMLDocument("New Document");
  let ndiv = doc.createElement("div");
  ndiv.innerHTML = ` Hello world `;
  ndiv.id = "app";

  doc.body.appendChild(ndiv);

  init("#app", template, doc);

  return doc;
};
