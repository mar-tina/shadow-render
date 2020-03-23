import { Shadow, useState } from "../index.js";

let state = {
  counter: 0
};

let Counter = Shadow("counter-el", {
  onMount: () => {
    console.log("Mounted counter-app");
  },
  getInitialState: self => {
    return useState({ counter: 0 }, self);
  },
  methods: {
    increment: (e, self) => {
      self.state.counter++;
      self.setState({ counter: self.state.counter }, false);
    },
    decrement: (e, self) => {
      self.state.counter--;
      self.setState({ counter: self.state.counter }, false);
    }
  },
  template: self => /*html*/ `
        <div @bind="counter"> ${self.state.counter} </div>
        <button @click="increment">  +  </button>
        <button @click="decrement">  -  </button>
    `
});
