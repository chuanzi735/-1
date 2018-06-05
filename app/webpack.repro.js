'use strict'

const path = require('path')
const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')

module.exports = {
  mode: 'none',
  plugins: [
    new MinifyPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  entry: './out-repro/ui/lib/author-input.js',
  target: 'electron-renderer',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'author-input.bundle.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, 'node_modules/')],
  },
}
