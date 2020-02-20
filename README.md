## Shadow Lib [For personal use]
A functional web component library that wraps the base HTMLElement class and provides a functional
interface to interact with web components inspired by vueJS. Abstracts away the underlying native  
html attributes and events providing a simpler interface.

## How To:

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
mean "this" - this object being the execution context of the component that provides access to the state 
object in the component. The available events are the ones available in the native browser. [only tested on chrome].
The default attribute indicates whether to run ``` e.preventDefault() ``` . 

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

BUGS:

### '@`eventName`'

- Binding events changes the other input values to undefined

