const path = require('path')

const createVueLoaderOptions = require('./vue-loader.config.js')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV || 'production',
  target: 'web',
  entry: path.join(__dirname, '../src/client/client.entry.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../public'),
    publicPath: '/public/'
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: createVueLoaderOptions(isDev)
          }
        ]
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // presets: ['latest'],
          // plugins: ['transform-runtime']
        }
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'resource/[path][name].[hash:8].[ext]'
          }
        }]
      }
    ]
  }
}

config.resolve = {
  alias: {
    '@': path.join(__dirname, '../src/'),
    'model': path.join(__dirname, '../src/client/model/server-model.js')
  }
}

module.exports = config
