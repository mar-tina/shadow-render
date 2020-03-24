import { Shadow, useState } from "../index.js";
import "./counter.js";

function runme() {
  console.log("Random run me");
}

export let Home = new Shadow("home-el", {
  onMount: self => {
    console.log("Mounted my-app");
  },
  getInitialState: self => {
    return useState({ counter: 0 }, self);
  },

  methods: {
    welcomeHome: function(e, self) {
      self.state.counter++;
      self.setState({ counter: self.state.counter }, true);
      console.log("Welcome Home", self.state);
    },

    drawme: function(e, self) {
      let cx = self._shadowRoot.querySelector("canvas").getContext("2d");
      let img = document.createElement("img");
      img.src = "./smol.png";
      for (let x = 10; x < 200; x += 10) {
        cx.drawImage(img, x, 10);
      }
    }
  },

  template: self => /*html*/ `
    <div> ${self.state.counter} </div>
    <div id="home-node" @click="welcomeHome">  Home Component  </div>
    <counter-el> </counter-el> 
    <img @load="drawme" src="./smol.png" />
    <canvas id="canvas" class="video"></canvas>
    `
});
