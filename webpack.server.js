const fs = require('fs');
const path = require('path');

module.exports = {

  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'server', 'production.js'),
  ],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'production.server.bundle.js',
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce((ext, mod) => {
    ext[mod] = 'commonjs ' + mod;
    return ext;
  }, {}),

  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['env', 'stage-1', 'react'],
          },
        }],
      },
    ],
  },
};
