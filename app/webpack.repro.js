'use strict'

const path = require('path')

module.exports = {
  mode: 'production',
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
