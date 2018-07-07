const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const baseConfig = require('./webpack.config.base.js')

let config

config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../src/client/server.entry.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server.entry.js',
    path: path.join(__dirname, '../server-build')
  },
  devtool: 'source-map',
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.[hash:4].css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin()
  ]
})

module.exports = config
