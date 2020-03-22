import { Shadow } from "../index.js";
import { Home } from "./home.js";

function runme() {
  console.log("Random run me");
}

export let App = new Shadow("my-app", {
  methods: {
    sayHi: function(e) {
      e.preventDefault();
      //stop propagation
      // if (e.target.id !== "parent-node") {
      //   return; // child was clicked, ignore onClick
      // }
      runme();
      console.log("I am saying hi", e);
    },
    no: function() {
      console.log("I am saying no");
    },
    mon: function() {
      console.log("I am saying mon");
    }
  },

  template: /*html*/ `
    <div  @click="sayHi">
      Hello 
    </div>
    <div @click="mon"> mon </div>
    <div @click="no"> Non  </div>
    <home-el> </home-el>
    `
});
