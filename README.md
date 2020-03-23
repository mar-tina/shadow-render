# SHADOW RENDER

[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

Whats new in this version ?

- Complete re-write of the toolkit.

### How to install

Currently in active development.

    Clone the Repository.
    Inside the 'src' folder add your components.

You can use npm and get the latest version that might be a little behind on features. Currently the project has zero dependencies so what you are pulling from npm is the unminified source file which is about 8kb in size.

    npm install shadow-render
    yarn add shadow-render

**_For Full transparency_**: It does use a dependency. A package called [uid](https://github.com/lukeed/uid). which is approximately 10 lines of code that was pulled in directly into the source file.

### How to use

- Init the app

The document is being passed in to allow easy mocking for testing purposes i.e

    let doc = document.implementation.createHTMLDocument("New Document");

This creates a HTMLElement document that can be used as the entry point for the toolkit.

```javascript
import { Shadow, initApp } from "../index.js";

let Entry = new Shadow("entry-point", {
  template: self => /*html*/ `
        <div id="my-app">
            <my-app> </my-app>
        </div>
    `
});

initApp("#app", Entry, document);
```

#### Lets create the `<my-app>` element

To use an element you need to import it's file .

```javascript
import "./counter.js"; // <-- import the counter element
let MyApp = new Shadow("my-app", {
  template: self => /*html*/ `
        <div>
            <counter-el> </counter-el> 
        </div>
    `
});
```

#### Create the counter element

Things to note:

- getInitialState has to be called in the exact signature below for it to register state and setState to the component to make them available in 'self'.

- You can pass in an object external to the component. i.e state is declared outside of Shadow and is passed into the useState function (provided by the toolkit) which then calls a statehandler function that watches and updates the object. The statehandler returns a state object and setState function which are then declared in the component and therefore made available in self.

```javascript
import { Shadow, useState } from "../index.js";

let state = {
  counter: 0
};

let Counter = Shadow("counter-el", {
  onMount: () => {
    console.log("Mounted counter-app");
  },

  getInitialState: self => {
    return useState(state, self);
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
        <div @bind="counter"> ${state.counter} </div>
        <button @click="increment">  +  </button>
        <button @click="decrement">  -  </button>
    `
});
```

That is the entirety of a counter app example . You can look through the source file for a better understanding of the toolkit. Currently standing at 180 lines of code.

### Running the app

For testing purposes you can use VS Code live server to run the app or set up the application with webpack.

### Contributing

Things to note:

    The project uses a  VS Code extension: ES6 String HTML for readability of the template object. Please remove the "/*html*/" prepending the template string if you are not using VS Code.

Contributing is as easy as:

- Forking this repo!

* Make your own updates

- Create a new pull request with a description of the changes made.
