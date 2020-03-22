import { Shadow } from "../index.js";

function runme() {
  console.log("Random run me");
}

export let Home = new Shadow("home-el", {
  methods: {
    welcomeHome: function(e) {
      runme();
      console.log("Welcome Home");
    }
  },

  template: /*html*/ `
    <div id="home-node" @click="welcomeHome">  Home Component  </div>
    `
});
