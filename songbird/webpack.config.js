const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let pages = ['game', 'start'];

const devServer = (isDevelopment) => !isDevelopment ? {} : {
  devServer: {
    open: true,
    hot: true,
    port: 8080,
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/assets',
    },
    devMiddleware: { index: './pages/start/start.html' }
    // or devMiddleware: { index: './pages/start/start.html' }
    // don't know how to setup dev-server for multipage website
  },
};

module.exports = ({development}) => ({
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
  entry: {
    game: './pages/game/scripts/game.js',
    start: './pages/start/scripts/start.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'pages/[name]/[name].[contenthash].js',
    assetModuleFilename: 'assetsDynamic/[hash][ext]',
  },
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [].concat(
    pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          inject: true,
          template: `./pages/${page}/${page}.html`,
          filename: `pages/${page}/${page}.html`,
          chunks: [page],
        })
    ),
    [
      new MiniCssExtractPlugin({ filename: 'pages/[name]/[name].[contenthash].css' }),
      new CopyPlugin({
        patterns: [
          {
            from: './assets',
            to: 'assets'
          }
        ]
      }),
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: false })
    ]
  ),
  ...devServer(development),
});
