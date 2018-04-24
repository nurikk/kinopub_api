var path = require('path');

module.exports = {
  entry: {
    'Api': './src/Api.js',
    'Demo': './src/demo.js'
  },
  output: {
		path: path.join(__dirname, "dist"),
		filename: "kinopub.[name].js",
		library: ["kinopub", "[name]"],
		libraryTarget: "umd"
	},
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
};