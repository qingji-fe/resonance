let path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const bigCamel = (name) => {
  return name
    .replace(/@qingji\//g, '')
    .split(/[\s\-\_]+/g)
    .map((w) => {
      const first = w[0];
      const other = w.slice(1);
      return first.toUpperCase() + other;
    })
    .join('');
};

module.exports = (opt) => {
  return {
    mode: 'production',
    entry: path.resolve(opt.path, './src/index.js'),
    output: {
      path: path.resolve(opt.path, './dist'),
      publicPath: '/',
      filename: `${opt.name}.min.js`,
      chunkFilename: '[name].js',
      library: bigCamel(opt.name),
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    externals: opt.externals,
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: `${opt.name}.css`,
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true,
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js|jsx$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      esmodules: true,
                    },
                  },
                ],
                '@babel/preset-react',
              ],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-nullish-coalescing-operator',
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-transform-modules-umd',
              ],
              comments: false,
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

        {
          test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: '[name].[hash:8].[ext]',
            outputPath: 'static/',
          },
        },
      ],
    },
    optimization: {
      minimize: false,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@': path.resolve(opt.path, './src'),
      },
    },
  };
};
