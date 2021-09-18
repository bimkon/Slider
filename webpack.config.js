const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const fs = require('fs');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {

  };
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }
  return config;
};

// Объект для быстрого обращения к путям
const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'), // Куда ложить: __dirname - корневая директория, dist - папка куда все сложить
};

// Путm к страницам, чтобы взять все страницы в формате pug
const PAGES_DIR = `${PATHS.src}/Example-page/`;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith('.pug'));

// Функция собирает имя для файлов в зависимости от мода сборки
const filename = (name, ext) => (isDev ? `${name}.${ext}` : `${name}.[hash].${ext}`);

module.exports = {

  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './src/index.ts'],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [
      path.resolve(`${__dirname}/node_modules`),
      path.resolve(`${__dirname}/src`),
    ],
  },

  output: {
    filename: filename('[name]', 'js'), // Имя будет собирать функция
    path: PATHS.dist,
  },

  optimization: optimization(),

  devServer: {
    contentBase: PATHS.dist,
    port: 8081,
    // hot: isDev
    // stats: "errors-only"
  },

  plugins: [
    ...PAGES.map(
      (page) => new HTMLWebpackPlugin({
        template: `${PAGES_DIR}/${page}`,
        filename: `${page.replace(/\.pug/, '.html')}`,
        minify: {
          collapseWhitespace: isProd,
        },
      }),
    ),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/favicon'),
      to: PATHS.dist,
    }]),
    new MiniCssExtractPlugin({
      filename: filename('[name]', 'css'),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
        ],
      },

      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              engine: 'rework',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {},
            },
          },
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: isDev,
        },
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        include: [path.resolve(__dirname, 'src/assets/fonts/')],
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          publicPath: isDev ? '/fonts/' : '/site1/fonts/',
          outputPath: 'fonts/',
        },
      },
      {
        test: /\.xml$/,
        use: ['xml-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
            ],
          },
        },
      },
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: {
            configFile: path.resolve('./tsconfig.json')
        },
        exclude: /node_modules/,
      },
    ],
  },
};
