import { html, init } from "../../dist/index.js";

describe("My First Test", function() {
  let doc = document.implementation.createHTMLDocument("New Document");

  it("Asserts that document exists", function() {
    expect(doc).to.exist;
  });
});
