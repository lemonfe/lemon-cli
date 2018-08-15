const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueClientPlugin = require('vue-server-renderer/client-plugin')

const baseConfig = require('./webpack.config.base.js')

const isDev = process.env.NODE_ENV === 'development'
const devServer = {
  port: 8000,
  host: '127.0.0.1',
  overlay: {
    errors: true
  },
  historyApiFallback: {
    index: '/public/index.html'
  },
  hot: true
}
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'index.html')
  }),
  new VueClientPlugin()
]
let config

if (isDev) {
  config = merge(baseConfig, {
    output: {
      filename: 'bundle.[hash:8].js',
      path: path.join(__dirname, '../public'),
      publicPath: 'http://localhost:8000/public/'
    },
    module: {
      rules: [
        {
          test: /\.scss/,
          use: [
            'vue-style-loader',
            'css-loader',
            // {
            //     loader: 'css-loader',
            //     options: {
            //         module: true,
            //         localIdentName: '[path]-[name]-[hash:base64:5]'
            //     }
            // },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'sass-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: [
      ...defaultPlugins,
      new webpack.HotModuleReplacementPlugin()
    ]
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../src/client/client.entry.js')
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
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
    optimization: {
      splitChunks: {
        cacheGroups: {
          chunks: 'all'
        }
      },
      runtimeChunk: true
    },
    plugins: [
      ...defaultPlugins,
      new ExtractTextPlugin({
        filename: 'styles.[hash:8].css',
        allChunks: true
      }
      )
    ]
  })
}

module.exports = config
