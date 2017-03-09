import webpack from 'webpack';
import merge from 'webpack-merge';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import base from './browser.base';
import { presets } from './constants';

module.exports = function config() {
  const baseConfig = base();
  const prodConfig = {
    devtool: 'cheap-module-source-map',
    entry: {
      main: [
        'babel-polyfill',
        './index.js',
      ],
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets,
        },
      }],
    },
    output: {
      filename: '[name].[chunkhash].js',
      sourceMapFilename: '[name].[chunkhash].map',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: 'vendor',
        minChunks: ({ context }) => context && context.indexOf('node_modules') !== -1,
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new HTMLWebpackPlugin({ filename: '200.html' }),
    ],
  };

  return merge(baseConfig, prodConfig);
};
