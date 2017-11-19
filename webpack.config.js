var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/benchmark.jsx",
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader', 'postcss-loader' ]
      },
      {
        test: /\.(jpg|jpeg|png)(\?.*)?$/, // Load only .jpg .jpeg, and .png files
        use: {
          loader: 'file-loader',
          options: {
            name: '[name][md5:hash].[ext]', // Name of bundled asset
            outputPath: '/', // Output location for assets. Final: `app/assets/webpack/webpack-assets/`
            publicPath: '/assets/webpack-assets' // Endpoint asset can be found at on Rails server
          },
        },
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: [".jsx", ".js", "*"]
  }
};
