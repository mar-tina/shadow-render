import { html, init } from "../../src/core.js";

let doc = document.implementation.createHTMLDocument("New Document");
let ndiv = doc.createElement("div");
ndiv.innerHTML = ` Hello world `;
ndiv.id = "app";

doc.body.appendChild(ndiv);

describe("Rendering Tests", function() {
  it("Asserts that init works", function() {
    let newtemplate = html(
      `<div> 
            <p>Welcome to the page</p> 
        </div>`
    );

    const myTemplate = () => newtemplate;
    init("#app", myTemplate(), doc);

    expect(
      doc.body.childNodes[0].shadowRoot.childNodes[0].innerHTML.trim()
    ).to.eq(`<p>Welcome to the page</p>`);
  });
});
