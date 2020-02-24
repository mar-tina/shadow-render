### Shadow-Render

### Project Status: EXPERIMENTAL.

An experimental functional web component toolkit that wraps the base HTMLElement class and provides a functional
interface to interact with web components inspired by vueJS. Aims at providing a simpler interface to
interacting with HTMLElement Class.


### For a more structured usage tutorial . Look at the classic [todo-app](https://github.com/mar-tina/shadow-render/tree/master/examples)


### Installation

#### Using npm package manager

```
  npm install shadow-render
```

#### Using yarn

```
  yarn add shadow-render
```

#### Using the template

You can clone the repo as a template directly on Github and create a new repo in your account or:

Clone the template repo [template repo](https://github.com/mar-tina/shadow-render-template)

```
  git clone https://github.com/mar-tina/shadow-render-template.git
```

Remove the origin

```
  git remote remove origin
```

Set your own origin

```
  git remote set-url origin [your-repo]
```

Check if the remote is set

```
  git remote -v
```

### USAGE:

#### Initializing the application.

**Disclaimer**: Toolkit is built around the concepts that i understand personally. There was no design document .
The process for coming up with this toolkit was on a build as you go basis .

To initialize the application . The toolkit provides an init function that requires you to pass in:

- [id] The div to bind to in index.html
- [template] The result of calling the html `parser` provided by the toolkit

```
    import { init, html } from "shadow-render";
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

Code example below illustrates how to read state. The template object as a default has the ctx passed in
as a param when app is being instantiated . The ctx avails the state object to the template object

```
   import { html, createShadowElement } from "shadow-render";

   let MyApp = createShadowElement({
      state: {
        name: "Welcome to the shadows"
      },

      methods: {},

      template: ctx => {
        return html(`
          <div id="my-app">
            Inside main app ${ctx.state.name}</div>
         `)
      }

   })

   customElements.define("my-app", MyApp)

```

#### Adding event handlers.

**IMPORTANT** ALL the elements with an event listener must have an id attribute

##### Syntax.

Prepend the event to bind to with an '@'.

```
  <button @onclick="methodToCall"> Click me </button>
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

```
   import { html, createShadowElement } from "shadow-render";

   let MyApp = createShadowElement({
      ...

      methods: {
        handleClick: (e, args) => {
          console.log("Been clicked", e, args.ctx);
        }
      },

      template: ctx => {
        html(`
          <div @onclick="handleClick" default=${false} id="main-app">
            Illustrate onclick event
          </div>
        `)
      }
   })

   customElements.define("my-app", MyApp)

```

#### SetState

SetState updates the state and re-renders the component. The current implementation performs poorly as more
elements are added to the screen and depending on how fast the elements are being rendered the performance
degrades.

```
   import { html, createShadowElement } from "shadow-render";

   let MyApp = createShadowElement({
        methods: {
         ...
         handleBtnClick: (e, args) => {
          args.ctx.setState({
            todos: [...ctx.state.todos, { name: "new todo", id: "new-one" }]
          });
        }
       }

       template: ctx => {
        html(`
          <div @onclick="handleClick" default=${false} id="main-app">
            Inside main app ${ctx.state.name}</div>

          <button @onclick="handleBtnClick" id="state-change"> State Change </button>
        `)
      }
   })

   ...
```

There are times where you would prefer to set state but not re-render the app. For example when you are
handling input . In this instance you can set the state directly as illustrated in the example todo-app in the
examples directory and snippet below

The execution context is only available inside the provided objects ['methods', 'lifecycle', 'template'] .
Future implementation for ['actions']

```
  ...
    args.ctx.state.todo = {
        name: e.target.value, <--
        ...
    };
  ...
```

You now have a basic app structure setup :tada:

Example App:
![The classic TODO APP](/screenshots/todo.gif)

### TODO:

- [:white_check_mark:] Initialize the application.

- [:white_check_mark:] Handling events.

- [:white_check_mark:] Creating new elements.

- [:white_check_mark:] Handling state update.

- [:white_check_mark:] Handling re-rendering of the component.

- [:hourglass:] Handling props being passed down from the parent

- [:white_check_mark:] Example App
