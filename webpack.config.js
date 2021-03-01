const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './example/src/index.html'),
  filename: './index.html'
});

module.exports = {
  entry: path.join(__dirname, './example/src/app.js'),
  output: {
    path: path.join(__dirname, 'example/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /\.min\.css$/,
        loader: ['style-loader', 'css-loader?modules']
      },
      {
        test: /\.min\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    port: 3001
  }
};
