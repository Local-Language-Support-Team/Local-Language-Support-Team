const { merge } = require("webpack-merge");
const { baseConfig } = require("./webpack.base");

module.exports = merge(baseConfig, {
  devtool: "eval-source-map",
});
