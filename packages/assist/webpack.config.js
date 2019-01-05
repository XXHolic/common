var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname,'dist'),
    fileName: 'bundle.js'
  },
  module:{
    rules: [
      {test: /\.js$/,exclude: /node_modules/,loader:'babel-loader'}
    ]
  }
};