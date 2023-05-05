const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/dist/',
    compress: true,
    port: 3001,
    hot: true,
    open: true,
  },
  
  devtool: 'source-map',
 
};

