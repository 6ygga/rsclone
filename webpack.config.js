const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: `${__dirname}/src/js/index.js`,

  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },

  devServer: {
    contentBase: './public',
    open: true,
    port: 7700,
  },

  module: {
    rules: [
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader', 'source-map-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${__dirname}/index.html`,
      inject: 'body',
      favicon: path.resolve(__dirname, 'src/assets/images/favicon.ico')
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/assets/images",
          to: "assets/images",
          globOptions: {
            ignore: ['**/*.ico'],
          },
           },
        { from: "./src/assets/music",
          to: "assets/music",
        },
      ],
    }),
  ],
};
