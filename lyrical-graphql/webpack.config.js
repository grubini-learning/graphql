const webpack = require(".pnpm/webpack@2.7.0/node_modules/webpack");
const HtmlWebpackPlugin = require(".pnpm/html-webpack-plugin@2.30.1_webpack@2.7.0/node_modules/html-webpack-plugin");

module.exports = {
  entry: "./client/index.js",
  output: {
    path: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/index.html",
    }),
  ],
};
