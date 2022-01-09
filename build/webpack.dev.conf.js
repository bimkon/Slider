/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const common = require('./webpack.base.conf');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
};
module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 8081,
    contentBase: path.join(__dirname, '../dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/example/index.pug',
      filename: 'index.html',
      scriptLoading: 'blocking',
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/favicon'),
      to: PATHS.dist,
    }]),
  ],
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: [path.resolve(__dirname, '../src/assets/fonts/')],
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          publicPath: '/fonts/',
          outputPath: 'fonts/',
        },
      },
    ],
  },
});
