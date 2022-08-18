const webpack = require("webpack");

module.exports = {
  entry: "./demo/index.js",
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"]
        }
    ]
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "/",
    filename: "bundle.js",
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    static: "./demo",
    hot: true,
  },
};