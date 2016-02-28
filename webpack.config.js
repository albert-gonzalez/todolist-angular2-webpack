var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: {
    todolist: './src/todolist/js/main.ts'
  },
  output: {
        path:     'dist',
        filename: '[name].bundle.js',
    },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ],
    noParse: [ /angular2\/bundles\/.+/ ]
  },

  resolve: {
    extensions: ['', '.ts', '.async.ts', '.js']
  },

  plugins: [
    new UglifyJsPlugin({
      beautify: true,
      mangle: false,
      compress : { screw_ie8 : true },
      comments: false

    })
  ]
}
