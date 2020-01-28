const path = require('path');
module.exports = env => {

  return {
    mode: env.production ? 'production' : 'development',
    entry: path.join(__dirname, 'src', 'index'),
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: "boverlay.js",
      chunkFilename: '[name]-[contenthash].js'
    },
    module: {
      rules: [{
        test: /.jsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: [
                ["@babel/env", {
                  "targets": {
                    "browsers": "last 2 chrome versions"
                  }
                }]
              ]
            }
          },
        ]
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
      }]
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx']
    },
    devtool: 'source-map',
    devServer: {
      contentBase: path.join(__dirname, '/dist/'),
      inline: true,
      host: 'localhost',
      port: 8080,
    }
  };
}