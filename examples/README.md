## Shadow-Render Tutorial

To create an app with shadow-render tutorial you can:

**Set it up from scratch**

- Directory structure
  +-- \_public
  | | +-- index.html
  +-- \_src
  | +-- components
  | | +-- app.js
  +-- package.json
  +-- webpack.config.js

- DevDependencies
  "@babel/cli": "^7.8.4",
  "@babel/core": "^7.8.4",
  "@babel/plugin-proposal-class-properties": "^7.8.3",
  "@babel/plugin-transform-async-to-generator": "^7.8.3",
  "@babel/preset-env": "^7.8.4",
  "@babel/preset-react": "^7.8.3",
  "babel-loader": "^8.0.6",
  "html-webpack-plugin": "^3.2.0",
  "webpack": "^4.29.4",
  "webpack-cli": "^3.1.1",
  "webpack-dev-server": "^3.1.0"

- Dependencies
  "shadow-render": "^0.2.0" <-- Get the latest one

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

    ``` yarn install ```
    ``` npm install ```

#### Run App

    - ``` yarn serve ```
    - ``` npm run serve ```

