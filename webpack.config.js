const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const commitId = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString()
  .trim()
  .substr(0, 8);

const PROD = process.env.NODE_ENV === 'production';

const output = PROD ? {
  path: `${__dirname}/dist`,
  filename: 'bundle.[hash].js',
  sourceMapFilename: 'bundle.[hash].map.js',
} : {
  path: __dirname,
  filename: 'bundle.js',
  sourceMapFilename: 'bundle.map.js',
};

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    },
    buildId: JSON.stringify(commitId || ''),
  }),
];

if (!PROD) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  );
} else {
  plugins.push(
    new webpack.IgnorePlugin(/^(babel-polyfill)$/),
  );
}

module.exports = {
  entry: PROD ? './src/index.js' : [
    'babel-polyfill',
    './src/index.js',
  ],
  output,
  plugins,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      }, {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['es2015', 'react'],
            plugins: [
              'transform-class-properties',
              'transform-object-rest-spread',
              'transform-export-extensions',
            ],
          },
        },
      }, {
        test: require.resolve('snapsvg'),
        loader: 'imports-loader?this=>window,fix=>module.exports=0',
      },
    ],
  },
};
