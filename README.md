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

The document is being passed in to allow easy mocking for testing purposes i.e

    let doc = document.implementation.createHTMLDocument("New Document");

This creates a HTMLElement document that can be used as the entry point for the toolkit.

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

- getInitialState has to be called with the exact signature below for it to register state and setState to the component to make them available in 'self'.

- You can pass in an object external to the component. i.e state is declared outside of Shadow and is passed into the useState function (provided by the toolkit) which then calls a statehandler function that watches and updates the object. The statehandler returns a state object and setState function which are then made available in self.

**Caveat** It becomes a globally available variable . Every similar instance of you component in your app will have a reference to that variable . So if `<counter-el>` one updates counter to 3 `<counter-el>` two picks up where one left off and starts counting from 3.

- When calling `setState()` there is a boolean variable passed in that tells the component whether to re-render on state change. If true : component is re-rendered. If false : only the elements bound to the state property that is being changed are re-rendered.

**NOTE:** This currently only works with very simple variable types -> strings, int, boolean

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
        <div @bind="counter"> ${self.state.counter} </div>
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


## Support

Reach out to me at one of the following places!

- Email at marr.tina344@gmail.com

## License

```
MIT License

Copyright (c) 2019 marr.tina344@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
