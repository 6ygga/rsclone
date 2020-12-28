const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// Require  html-webpack-plugin plugin
module.exports = {
  entry: `${__dirname}/src/js/index.js`, // webpack entry point. Module to start building dependency graph
  output: {
    path: `${__dirname}/dist`, // Folder to store generated bundle
    filename: 'bundle.js', // Name of generated bundle after build
    publicPath: '/', // public URL of the output directory when referenced in a browser
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
      {
        test: /\.(jpg|mp3|svg|png)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: ['eslint-loader', 'source-map-loader'],
      },
    ],
  },
  plugins: [ // Array of plugins to apply to build chunk
    new HtmlWebpackPlugin({
      template: `${__dirname}/index.html`,
      inject: 'body',
    }),
    new FaviconsWebpackPlugin(`${__dirname}/src/assets/images/favicon.ico`),
  ],
  devServer: { // configuration for webpack-dev-server
    contentBase: './public', // source of static assets
    open: true,
    port: 7700, // port to run dev-server
  },

};
