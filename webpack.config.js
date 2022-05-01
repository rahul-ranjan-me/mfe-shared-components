const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");
const { Module } = require("module");
const deps = require("./package.json").dependencies;
const mode = process.env.mode ? process.env.mode : "development";
const port = process.env.port || 6002;

module.exports = {
  entry: {
    shared_components: "./src/index"
  },
  mode,
  devServer: {
    static: path.resolve(__dirname, "public"),
    port,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    },
  },
  resolve: {
    extensions: [".js", ".mjs", ".jsx", ".css"],
    alias: {
      events: "events",
    },
  },
  output: {
    chunkFilename: "[id].[contentHash].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|eot|woff|ttf|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shared_components",
      filename: "remoteEntry.js",
      exposes: {
        "./dynamicFederationUtils": "./src/utils/dynamicFederationUtils",
        "./Components": "./src/components"
      },
      shared: [
        {
          react: {
            singleton: true,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: '18.0.0'
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({ filename: "[id].[contenthash].css" }),
  ],
  devtool: "source-map",
};
