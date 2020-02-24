## Shadow-Render Tutorial

To create an app with shadow-render tutorial you can:

**Set it up from scratch**

- Directory structure

  📦todo-app

  ┣ 📂public

  ┃ ┗ 📜index.html

  ┣ 📂src

  ┃ ┣ 📂components

  ┃ ┃ ┣ 📜app.js

  ┃ ┃ ┣ 📜appStyle.js

  ┃ ┗ 📜index.js

  ┣ 📜.babelrc

  ┣ 📜.gitignore

  ┣ 📜package.json

  ┗ 📜webpack.config.js

- DevDependencies

  - "@babel/cli": "^7.8.4",
  - "@babel/core": "^7.8.4",
  - "@babel/plugin-proposal-class-properties": "^7.8.3",
  - "@babel/plugin-transform-async-to-generator": "^7.8.3",
  - "@babel/preset-env": "^7.8.4",
  - "@babel/preset-react": "^7.8.3",
  - "babel-loader": "^8.0.6",
  - "html-webpack-plugin": "^3.2.0",
  - "webpack": "^4.29.4",
  - "webpack-cli": "^3.1.1",
  - "webpack-dev-server": "^3.1.0"

- Dependencies

  - "shadow-render": "^0.2.0" <-- Get the latest one

- Webpack config content

  ```
  const path = require("path");
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const webpack = require("webpack");

  module.exports = {
  entry: "./src/index.js",
  output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index.js",
  },
  mode: "development",
  plugins: [
      new HtmlWebpackPlugin({
      template: "public/index.html"
      })
  ],
  module: {
      rules: [
      {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
          loader: "babel-loader",
          options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-proposal-class-properties"]
          }
          }
      }
      ]
  },
  stats: {
      colors: true
  },
  devtool: "source-map"
  };

  ```

#### Install dependencies

    yarn install
    npm install

#### Run App

    yarn serve
    npm run serve

#### First steps

**Initialising the application.**

In the index.html file create a div with id "app". Navigate to index.js and paste the following code

```
    import { init, html } from "shadow-render";

    let newtemplate = html(
    `<div>
        Get started with shadow-render
    </div>`
    );

    const myTemplate = () => newtemplate;

    init("#app", myTemplate());
```

##### init

    - The init function takes in 2 parameters [id] and [template]
    - [id] is the location to bind the app to in index.html
    - [template] is the result of calling the parser html()

The init function is separate from the shadow components implementation. To load a template in this
file you have to import it like below.

```
    ...

    import './components/app.js"

    let newtemplate = html(
    `<div>
        ...
        <main-app></main-app>
    </div>`
    );

    ....
```

**Implementing TODO App**

Import the necessary files from shadow-render. Remember to call `customElements.define()` and pass in the
createShadowElement result.

```
    import { html, createShadowElement } from 'shadow-render'

    let MyApp = createShadowElement({
        state: {},

        methods: {},

        template: (ctx) => {
            return html(`
                <div>
                    TODOS
                </div>
            `)
        }
    });

    customElements.define("my-app", MyApp);
```

The createShadowElements takes in 3 arguments:

- state -> holds the state of the component
- methods -> holds the event handlers
- template -> holds the template for the application

**Adding a Todo**

##### Adding an input element to the template

```
    ...

    template: (ctx) => {
        return html(`
            <div>
                TODOs
                <input />
            </div>
        `);
    }
```

##### Adding an event handler for the input. All elements with event handlers must have an id attribute

```
    ...
    methods {
        handleInput: (e, args) {
            console.log("Getting input", e.target.value);
            let sanitizedInput = sanitize(e.target.value);
            let parsedID = sanitizedInput.replace(/\s+/g, "-").toLowerCase();

            args.ctx.state.todo = {
                name: sanitizedInput,
                id: parsedID,
                done: false
            };
        }
    }
    ...

    ...
        <input id="todo-input" @oninput="handleInput" />
    ...
```

##### Handling state for the input element.

Because we are not using a database The todo id will be the same as the name of the todo.
Sanitize the input. Parse the id to transform spaces to '-'. set the state directly using the
args variable passed in to the function.

```
    methods {
        handleInput: (e, args) {
            let sanitizedInput = sanitize(e.target.value);
            let parsedID = sanitizedInput.replace(/\s+/g, "-").toLowerCase();

            args.ctx.state.todo = {
                name: sanitizedInput,
                id: parsedID,
                done: false
            };
        }
    }
```

##### Handling todo submission

Ensure the state object has a todos array object. and call ctx.setState and push the temporary todo that
has been set by the input elment.

```
    ...

    methods: {
        ...

        handleSubmit: (e, args) => {
            args.ctx.setState({
                todos: [...args.ctx.state.todos, args.ctx.state.todo]
            });
        }
    }

    <button @onclick="handleSubmit" id="submit-todo"> Submit TODO </buttom>
    ...
```

##### Viewing all the todos

Map over the todos.

```
let todoList = state => {
  return `${state.todos
    .map(
      x =>
        ` <div  id=${x.id +"none"}  bind=${x.id}>  ${x.name} </div>`)
    .join("")}`;
};

```

Call the todolist function insite the template object and pass in the state object to provide
access to the todos.

```
    template: (ctx) => {
        ...
            <div id="todo-list"> ${todoList(ctx.state)} </div>
        ...
    }
```

##### Deleting a TODO

Add an SVG delete element. Set an onclick attribute and bind it with the passed in id of the current todo

```
    <div>
        <div id=${x.id +"superrandom"}  bind=${x.id}>  ${x.name} </div>

         <!-- Append a randomized string to svg ID to avoid more than one element sharing the same id -->
         <svg id=${x.id + "rand"} @onclick="deleteTodo"  bind=${x.id} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>

    </div>
```

Inside of the methods object add the "deleteTodo" method. The parameter that was passed in bind will be attached to
the args as the value bound. Filter the todos, call `ctx.setState()` and set the new todos array

```
    methods: {
        ...
        deleteTodo: (e, args) => {
            let newTodos = args.ctx.state.todos.filter(
                item => item.id !== args.bound
            );
            args.ctx.setState({
                todos: newTodos
            });
        },
    }
```

##### Marking TODO as Done or viceversa

Follows the same structure as delete .

```
    <div>
        <div id=${x.id +"superrandom"}  bind=${x.id}>  ${x.name} </div>
        <!-- Append a randomized string to svg ID to avoid more than one element sharing the same id -->
        <svg id=${x.id + "abs"} @onclick="markAsDone" bind=${x.id}  xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke=${x.done ? "green" : "black"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </div>

    ...
        methods: {
            ...
            markAsDone: (e, args) => {
                args.ctx.state.todos.map(item => {
                    if (item.id === args.bound) {
                        item.done = !item.done;
                    }
                });

                args.ctx.setState({
                    todos: args.ctx.state.todos
                });
            },
        }
    ...
```

##### Finally editing a todo

Locate the div or element that is outputing the todo label/name. add a contentEditable="true" attribute to it

```
    <div @oninput="handleEdit" contentEditable=${true} id=${x.id +"randnone"}  bind=${x.id}>  ${x.name} </div>

    methods: {
        ...
         handleEdit: (e, args) => {
            args.ctx.state.todos.map(item => {
                if (item.id === args.bound) {
                item.name = sanitize(e.target.innerText);
                }
            });
        }
    }
```

Thats it :tada: You have a working CRUD Todo Application. Final part has to do with the styling of the application

```
    export let todoItem = `
        color:blue;
        text-align:center;
        padding: 10px;
    `;

     <div @oninput="handleEdit" contentEditable=${true} style="${todoItem}" id=${x.id +"randnone"}  bind=${x.id}>  ${x.name} </div>

```

**The Full working application is in the todo-app directory in the examples directory**

Feel Free to submit issues and add your own features to the example app and to the toolkit. :tada:
