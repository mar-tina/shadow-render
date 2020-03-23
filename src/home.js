import { Shadow } from "../index.js";
import "./counter.js";

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

  template: self => /*html*/ `
    <div id="home-node" @click="welcomeHome">  Home Component  </div>
    <counter-el> </counter-el> 
    `
});
