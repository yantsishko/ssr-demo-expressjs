const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new HtmlWebpackPlugin({
    inject: true,
    template: 'app/static/index.html',
    filename: 'main.html',
  }),
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/,
    failOnError: false,
  }),
];

module.exports = require('./webpack.base.babel')({
  entry: [
    'eventsource-polyfill', // Necessary for hot reloading with IE
    path.join(process.cwd(), 'browser/index.js'),
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },

  plugins,
  devtool: 'eval-source-map',

  performance: {
    hints: false,
  },
});
