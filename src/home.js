import { Shadow } from "../index.js";

function runme() {
  console.log("Random run me");
}

function asJSON(obj) {
  return JSON.stringify(obj);
}

let obj = {
  name: "hello",
  email: {
    first: "hi",
    last: "no"
  }
};

let name = "hi";

export let Home = new Shadow("home-el", {
  methods: {
    welcomeHome: function(e) {
      runme();
      console.log("Welcome Home");
    }
  },

  template: /*html*/ `
    <div props=${asJSON(
      obj
    )} id="home-node" @click="welcomeHome">  Home Component  </div>
    `
});
