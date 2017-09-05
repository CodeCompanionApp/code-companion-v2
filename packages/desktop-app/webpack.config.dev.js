const webpack = require('webpack');
const config = require('./webpack.config');
const path = require('path');

config.devtool = 'source-map';

config.entry.app.unshift(
  'react-hot-loader/patch',
);

config.devServer = {
  hot: true,
  historyApiFallback: true,
  publicPath: 'http://localhost:8080/public/',
  contentBase: path.join(__dirname, 'public'),
};

config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
);

module.exports = config;
