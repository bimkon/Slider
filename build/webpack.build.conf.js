/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: '../src/assets/',
};

module.exports = merge(baseWebpackConfig, {
  entry: {
    bimkonPlugin: './src/index.ts',
  },
  output: {
    filename: '[name].js',
    path: `${PATHS.dist}`,
  },
  mode: 'production',
  externals: {
    jquery: 'jQuery',
  },
  plugins: [],
});
