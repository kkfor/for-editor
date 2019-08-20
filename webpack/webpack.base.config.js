// const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: './example/index.tsx',
  devtool: isDev && 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.(sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
              sourceMap: isDev
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.module\.(sass|scss)$/,
        use: [
          require.resolve('style-loader'),
          require.resolve('css-modules-typescript-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 2,
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')],
              sourceMap: isDev
            }
          },
          require.resolve('sass-loader')
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|svg)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/fonts/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.md$/,
        loader: require.resolve('raw-loader')
      }
    ]
  }
}
