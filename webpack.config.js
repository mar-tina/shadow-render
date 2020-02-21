// const path = require("path");

// module.exports = {
//   entry: path.resolve(__dirname, "src/core.js"),
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "index.js",
//     library: "$",
//     libraryTarget: "umd"
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js)$/,
//         exclude: /node_modules/,
//         use: ["babel-loader"],
//         query: {
//           presets: ["es2016", "stage-2"],
//           plugins: ["@babel/plugin-proposal-decorators", { legacy: true }]
//         }
//       }
//     ]
//   },
//   resolve: {
//     extensions: [".js"],
//     modules: [path.resolve(__dirname, "src")]
//   },
//   mode: "development",
//   devtool: "sourceMap"
// };

const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/core.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
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
            presets: ["@babel/preset-env", "@babel/preset-react"]
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
