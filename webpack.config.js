const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// Require  html-webpack-plugin plugin
module.exports = {
  entry: `${__dirname}/src/js/index.js`, // webpack entry point. Module to start building dependency graph
  output: {
    path: `${__dirname}/dist`, // Folder to store generated bundle
    filename: 'bundle.js', // Name of generated bundle after build
    // publicPath: '/', // public URL of the output directory when referenced in a browser
  },
  module: { // where we defined file patterns and their loaders
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      /* {
        test: /\.(jpg|mp3|svg|png)$/,
        loader: 'file-loader',
        options: {
          name: `./src/assets/images/[name].[ext]`,
        },
      }, */
      {
        enforce: 'pre',
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader', 'source-map-loader'],
      },
    ],
  },
  plugins: [ // Array of plugins to apply to build chunk
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${__dirname}/index.html`,
      inject: 'body',
      favicon: path.resolve(__dirname, 'src/assets/images/favicon.ico')
    }),
    // new FaviconsWebpackPlugin(`${__dirname}/src/assets/images/favicon.ico`),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/assets/images",
          to: "assets/images",
          globOptions: {
            ignore: [
              '**/*.ico',
            ],
          },
           },
        { from: "./src/assets/music",
          to: "assets/music",
        },
      ],
    }),
  ],
  devServer: { // configuration for webpack-dev-server
    contentBase: './public', // source of static assets
    open: true,
    port: 7700, // port to run dev-server
  },

};
