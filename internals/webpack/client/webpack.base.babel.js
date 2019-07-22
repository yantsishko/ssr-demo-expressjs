const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const autoprefixer = require('autoprefixer');
const alias = require('./../alias');

const plugins = [
  new ProgressBarPlugin(),
  new CopyWebpackPlugin([
    { from: 'app/images', to: 'images' },
    { from: 'app/static/**', to: '.' },
  ]),
  new webpack.ProvidePlugin({
    // make fetch available
    fetch: 'exports-loader?self.fetch!whatwg-fetch',
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new webpack.NamedModulesPlugin(),
];

module.exports = options => ({
  entry: options.entry,
  output: Object.assign({
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|app[/\\]+libs.*)/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader?modules=false',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: process.env.NODE_ENV !== 'production' ? '[name]-[local]-[hash:base64:5]' : '[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: [
                    'ie >= 8',
                    'last 4 version',
                    'iOS >= 8',
                  ],
                }),
              ],
              sourceMap: true,
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.css$/,
        include: /(node_modules|app)/,
        use: ['isomorphic-style-loader', 'css-loader?modules=false'],
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(mp4|webm|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat(plugins),
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
      'main',
      'jsnext:main',
    ],
  },
  devtool: options.devtool,
  target: 'web',
  performance: options.performance || {},
  node: {
    child_process: 'empty',
    fs: 'empty',
    module: 'empty',
    net: 'empty',
    tls: 'empty',
  },
});
