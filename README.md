## Shadow Lib [For personal use]
A functional web component library that wraps the base HTMLElement class and provides a functional
interface to interact with web components inspired by vueJS. Abstracts away the underlying native  
html attributes and events providing a simpler interface.

### HOW TO:

#### Initializing the application.

The init function binds the application to the index.html using the div id '#app' 

``` 
    import { init, html } from "../../../src/core.js"; 
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
``` 
   import { html, createShadowElement } from "../../../../src/core.js";
   
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
#### Adding event handlers 
The event handlers are passed in the event object and "context" consecutively [using this label loosely] to 
context meaning the execution context of the component that provides access to the state 
object in the component.  

The available events that can be bound to the HTML elements are the ones available in the native browser.
[only tested on chrome].


The `default` attribute indicates whether to run ``` e.preventDefault() ``` . 

```
   import { html, createShadowElement } from "../../../../src/core.js";
   
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

You now have a basic app structure setup :tada:

### TODO: 

- [:white_check_mark:] Initialize the application.

- [:white_check_mark:] Handling events.

- [:white_check_mark:] Creating new elements.

- [:hourglass:] Handling state update.

- [:negative_squared_cross_mark:] Handling re-rendering of the component.

- [:negative_squared_cross_mark:] Handling setting element attributes

- [:negative_squared_cross_mark:] Handling props being passed down from the parent


### BUGS:

### '@`eventName`'

- [:bug:] Binding events changes the other attribute values to undefined || changes the value to the passed in function

