### Shadow-Render

### Project Status: EXPERIMENTAL.

An experimental functional web component toolkit that wraps the base HTMLElement class and provides a functional
interface to interact with web components inspired by vueJS. Aims at providing a simpler interface to
interacting with HTMLElement Class.

### For a more structured usage tutorial . Look at the classic [todo-app](https://github.com/mar-tina/shadow-render/tree/master/examples)

[Click here](https://mar-tina.github.io/todo-sample-app/) to see a live example app.

[Repository link](https://github.com/mar-tina/todo-sample-app) . to the source for the live example app checkout the master branch.

### Installation

```
  npm install shadow-render
```

```
  yarn add shadow-render
```

#### Using the template

You can clone the repo as a template directly on Github and create a new repo in your account or:

Clone the template repo [template repo](https://github.com/mar-tina/shadow-render-template)

### USAGE:

Here is an example counter-app to illustrate simple usage like method calls and binding to event listeners

```
  import { html, createShadowElement } from "../../../../dist/core.min.js";

  let CounterApp = createShadowElement({
    state: {
      counter: 0
    },

    lifecycle: {
      onMount: () => {
        console.log("Counter mounted");
      }
    },

    methods: {
      increment: (e, args) => {
        args.ctx.setState({
          counter: (args.ctx.state.counter += 1)
        });
      },

      decrement: (e, args) => {
        args.ctx.setState({
          counter: (args.ctx.state.counter -= 1)
        });
      }
    },

    template: ctx => {
      return html(`
              <p> ${ctx.state.counter}</p>
              <button default="${true}" id="increment-counter" @onclick="increment"> + </button>
              <button default="${true}" id="decrement-counter" @onclick="decrement"> - </button>
          `);
    }
});

customElements.define("counter-app", CounterApp);

```

#### Initializing the application.

To initialize the application . The toolkit provides an init function that requires you to pass in:

- [id] The div to bind to in index.html
- [template] The result of calling the html `parser` provided by the toolkit

```
    import { init, html } from "shadow-render";
    import "./components/app.js";

    let newtemplate = html(
      ` ...
          <counter-app> </counter-app>
        ...
      `
    );

    const myTemplate = () => newtemplate;

    init("#app", myTemplate());
```

#### Creating a new element

Create a new shadow element by importing the `createShadowElement` function from the lib and add a new tag id to the document by calling `customElements.define`

Code example below illustrates how to read state. The template object as a default has the ctx passed in
as a param when app is being instantiated . The ctx avails the state object to the template object

#### Adding event handlers.

**IMPORTANT** ALL the elements with an event listener must have an id attribute

##### Syntax.

Prepend the event to bind to with an '@'.

```
  <button id="click-me" @onclick="methodToCall"> Click me </button>
```

The methods are provided the event object and an args object by default and get 'undefined' if any of the
attributes is missing

- [args.ctx] - This is the current execution context
- [args.bound] - This is the value that is bound to the method.

Why use bind ? The toolkit uses a very primitive html parser. Meaning it's difficult to pass around objects.
The bind attribute specifies the props that should be available to the passed in method. They are returned and
passed in as defaults to the method being called.

The available events that can be bound to the HTML elements are the ones available in the native browser.
[only tested on chrome].

The `default` attribute indicates whether to run `e.preventDefault()` .

#### SetState

SetState updates the state and re-renders the component.There are times where you would prefer to set state but not re-render the app. For example when you are handling input . In this instance you can set the state directly as illustrated in the example todo-app in the
examples directory and snippet below

```
  ...
    args.ctx.state.todo = {
        name: e.target.value, <--
        ...
    };
  ...
```

The execution context is only available inside the provided objects ['methods', 'lifecycle', 'template', 'actions' ] .

##### Working with actions

For example if you want to subscribe to a given context. They work on the same foundation as methods. Define
your actions and then call them passing in the necessarry arguments. The contextProvider will be explained in the
next section.

```
  actions: {
    subscribe: (self, contextProvider) => {
      let callback = {
        listenOn: "set",
        f: (property, args) => {
          self.setState({
            todos: args
          });
        }
      };
      try {
        return contextProvider.subToContext("todoCtx", callback);
      } catch (error) {
        console.log("Failed", error);
      }
    }
  }
```

##### Working with context providers

Compared to passing down props to child elements providers provide global access to published data.
It uses the pub sub model where other elements sub and get the returned data or side effects from the
element that published the data.

**Caveat:** The subscribers can change the data.

The contex providers have 2 methods:

```
  contextProvider.addNewContext(arg1, arg2);
```

```
  contextProvider.addNewContext(arg1, arg2);
```

`arg1 - The name of the new context to be added.`

`arg2 - The object to be watched by the context.`

```
  contextProvider.subToContext(arg1, arg2)
```

`arg1 - name of the context to sub to.`

`arg2 - the callback`

The structure of the callback is important. It has to have a `listenOn` attribute and the callback function.
The callback function is passed back in 2 values, The property name that was changed and it's current value.
The `listenOn` attribute listens to either `set` or `get` calls on the object being watched by the proxy that
runs in the context provider

```
  callback = {
    listenOn: "set"
    f: (property, args) => {
      console.log(`This property changed ${property} and this it's current value ${args}`)
    }
  }
```

### TODO:

- [:white_check_mark:] Initialize the application.

- [:white_check_mark:] Handling events.

- [:white_check_mark:] Creating new elements.

- [:white_check_mark:] Handling state update.

- [:white_check_mark:] Handling re-rendering of the component.

- [:white_check_mark:] Passing data across components

- [:white_check_mark:] Example App
