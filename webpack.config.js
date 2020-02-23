const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/core.js"),
  output: {
    path: path.resolve(__dirname),
    filename: "index.js",
    library: "$",
    libraryTarget: "umd"
  },
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
  resolve: {
    extensions: [".js"],
    modules: [path.resolve(__dirname, "src")]
  },
  mode: "development",
  devtool: "sourceMap"
};
