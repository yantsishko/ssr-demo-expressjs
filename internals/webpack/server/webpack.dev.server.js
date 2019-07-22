const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const alias = require('./../alias');
const rules = require('./rules');

const nodeConf = {
  target: 'node',
  entry: './server.js',
  externals: [nodeExternals(), 'react-helmet'],
  output: {
    path: path.resolve('build'),
    filename: 'server.js',
    library: 'app',
    libraryTarget: 'commonjs2',
    publicPath: '/',
  },
  module: {
    rules,
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'app/images', to: 'images' },
      { from: 'app/static/**', to: '.' },
    ]),
    new webpack.ProvidePlugin({
      window: path.resolve(path.join(__dirname, './../window.mock')),
      document: 'global/document',
    }),
  ],
  resolve: {
    alias,
    modules: [
      path.resolve('./app'),
      path.resolve(process.cwd(), 'node_modules'),
    ],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
};

const browserConf = require('../client/webpack.dev.babel');

module.exports = [browserConf, nodeConf];
