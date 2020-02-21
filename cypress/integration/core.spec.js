import { html, init, createShadowElement } from "../../src/core.js";
import { mockDocument } from "../../src/mock.js";

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
    let doc = mockDocument(newtemplate);
    expect(
      doc.body.childNodes[0].shadowRoot.childNodes[0].innerHTML.trim()
    ).to.eq(`<p>Welcome to the page</p>`);
  });

  it("Element is rendered correctly", function() {
    let MyApp = createShadowElement({
      state: {
        name: "Shadow element"
      },

      template: state => {
        return html(`
            <div> "SOMETHING IS HERE ${state.name} </div>
            `);
      }
    });

    customElements.define("my-app", MyApp);
    let otherTemplate = html(`<div> <my-app> </my-app> </div>`);

    let doc = mockDocument(otherTemplate);

    expect(
      doc.body.childNodes[0].shadowRoot.childNodes[0].childNodes[1].shadowRoot
        .childNodes[0].innerHTML
    ).to.eq(`<div> "SOMETHING IS HERE Shadow element </div>`);
  });
});
