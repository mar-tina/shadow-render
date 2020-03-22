import { Shadow, useState } from "../index.js";
import { Home } from "./home.js";

function runme() {
  console.log("Random run me");
}

let [state, setState] = useState({});

export let App = new Shadow("my-app", {
  onMount: () => {
    console.log("Mounted my-app");
  },

  methods: {
    sayHi: e => {
      e.preventDefault();
      state.name = "update me pls";

      console.log("What is here", state.name);
      console.log("I am saying hi", state.name);
    },
    no: function() {
      state.name = "saying hell no";
      setState(state);
      console.log("I am ", state.name);
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
      <div @click="no"> Saying no </div>
      <div> ${state} </div>
      <input @bind=${state.name} />
      <home-el> </home-el>
    `
});
