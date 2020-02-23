### Shadow-Render

An experimental functional web component toolkit that wraps the base HTMLElement class and provides a functional
interface to interact with web components inspired by vueJS. Aims at providing a simpler interface to
interacting with HTMLElement Class.

##### Why

> Solves a personal pain point . Needed a functional approach to dealing with HTMLElement class and reduce the boiler plate that involved setting up new classes each time to define a new shadowRoot.
> This can be done without needing to wrap the HTMLElement class but the default HTML class comes with some defaults like
> scoped state .. connectedCallback .. makes development easier.

### Installation

Using npm package manager
```
  npm install shadow-render 
```
Using yarn 
```
  yarn add shadow-render
```

### USAGE:
#### Initializing the application.
The toolkit is 

The init function binds the application to the index.html . Default setup binds with the div id '#app'

```
    import { init, html } from "shadow-render/src/core.js";
    import "./components/app.js";

    let newtemplate = html(
      `<div>
        <p>Welcome to the page</p>
        <div>
          <my-app> </my-app>
        </div>
      </div>`
    );

    const myTemplate = () => newtemplate;

    init("#app", myTemplate());
```

#### Creating a new element

Create a new shadow element by importing the `createShadowElement` function from the lib and add a new tag id to the document by calling `customElements.define`

**IMPORTANT** ALL the elements with an event listener must have an id attribute

```
   import { html, createShadowElement } from "shadow-render/src/core.js";

   let MyApp = createShadowElement({
      state: {
        name: "Welcome to the shadows"
      },

      methods: {},

      template: state => {
        return html(`
          <div id="my-app">
            Inside main app ${state.name}</div>
         `)
      }

   })

   customElements.define("my-app", MyApp)

```

#### Adding event handlers.

##### Syntax.

Prepend the event to bind to with an '@'.

`<button @onclick="methodToCall"> Click me </button>`

The event handlers are passed in the event object and "context" consecutively [using context loosely]
meaning the execution context of the component that provides access to the state object in the component.

The available events that can be bound to the HTML elements are the ones available in the native browser.
[only tested on chrome].

The `default` attribute indicates whether to run `e.preventDefault()` .

```
   import { html, createShadowElement } from "shadow-render/src/core.js";

   let MyApp = createShadowElement({
      ...

      methods: {
        handleClick: (e, ctx) => {
          console.log("Been clicked", e, ctx);
        }
      },

      template: state => {
        html(`
          <div @onclick="handleClick" default=${false} id="main-app">
            Inside main app ${state.name}</div>
        `)
      }
   })

   customElements.define("my-app", MyApp)

```

#### SetState

SetState updates the state and re-renders the component. The current implementation performs poorly as more
elements are added to the screen and depending on how fast the elements are being rendered the performance
degrades.

Can only be called inside the provided objects ['methods', 'onmount'] . Future implementation for ['actions']

```
   import { html, createShadowElement } from "shadow-render/src/core.js";

   let MyApp = createShadowElement({
        methods: {
         ...
         handleBtnClick: (e, ctx) => {
          ctx.setState({
            todos: [...ctx.state.todos, { name: "new todo", id: "new-one" }]
          });
        }
       }

       template: state => {
        html(`
          <div @onclick="handleClick" default=${false} id="main-app">
            Inside main app ${state.name}</div>

          <button @onclick="handleBtnClick" id="state-change"> State Change </button>
        `)
      }
   })

   ...
```

You now have a basic app structure setup :tada:

### TODO:

- [:white_check_mark:] Initialize the application.

- [:white_check_mark:] Handling events.

- [:white_check_mark:] Creating new elements.

- [:white_check_mark:] Handling state update.

- [:white_check_mark:] Handling re-rendering of the component.

- [:hourglass:] Handling props being passed down from the parent

- [:hourglass:] Example App
