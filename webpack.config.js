var path = require('path');

module.exports = {
  entry: './src/Api.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'KinopubApi.js',
    library: 'kinopub'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
};