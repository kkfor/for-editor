const webpackBaseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  entry: ['./example/index.js'],
  output: {
    path: path.resolve(__dirname, '../playground'),
    filename: 'index.js',
    publicPath: '/',
    libraryTarget: 'umd'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJsPlugin()
  ]
})
