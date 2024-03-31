const express = require(".pnpm/express@4.18.3/node_modules/express");
const models = require("./models/index.js");
const expressGraphQL = require("express-graphql");
const mongoose = require("mongoose");
const bodyParser = require(".pnpm/body-parser@1.20.2/node_modules/body-parser");
const schema = require("./schema/schema.js");

const app = express();

// Replace with your Mongo Atlas URI
const MONGO_URI =
  "mongodb+srv://grmsse:Gvr31%40Addams@cluster0.yzbl2hg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
if (!MONGO_URI) {
  throw new Error("You must provide a Mongo Atlas URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to Mongo Atlas instance."))
  .on("error", (error) =>
    console.log("Error connecting to Mongo Atlas:", error)
  );

app.use(bodyParser.json());
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require(".pnpm/webpack@2.7.0/node_modules/webpack");
const webpackConfig = require("../webpack.config.js");
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
