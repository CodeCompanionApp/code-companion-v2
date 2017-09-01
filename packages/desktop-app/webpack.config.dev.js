const webpack = require('webpack');
const config = require('./webpack.config');

config.devtool = 'source-map';

config.entry.app.unshift(
  'react-hot-loader/patch',
);

config.devServer = {
  contentBase: './dist',
  hot: true,
};

config.plugins.unshift(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
);

module.exports = config;
