const webpackBaseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  entry: ['./example/index.js'],
  output: {
    path: path.resolve(__dirname, '../demo'),
    filename: 'index.js',
    publicPath: '/',
    libraryTarget: 'umd'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './example/index.html'
    })
  ]
})
