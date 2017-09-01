const path = require('path');

module.exports = {
  entry: {
    app: [
      './src/index.jsx',
    ],
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },

  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },

  plugins: [],

  target: 'electron-renderer',
};
