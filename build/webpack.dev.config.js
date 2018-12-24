const webpackBaseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: ['./example/index.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    // contentBase: path.resolve(__dirname, '../dist'),
    // watchContentBase: true,
    historyApiFallback: true,
    disableHostCheck: true,
    inline: true,
    host: '0.0.0.0',
    port: 3020,
    hot: true
  }
})
