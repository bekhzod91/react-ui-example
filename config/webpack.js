const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const project = require('./project')

const inProject = path.resolve.bind(path, project.basePath)
const inProjectSrc = (file) => inProject(project.srcDir, file)

const __DEV__ = project.env === 'development'
const __TEST__ = project.env === 'test'
const __PROD__ = project.env === 'production'

const config = {
  mode: __PROD__ ? 'production' : 'development',
  entry: {
    normalize: [
      inProjectSrc('normalize'),
    ],
    main: [
      inProjectSrc(project.main),
    ],
  },
  optimization: {
    minimizer: []
  },
  devtool: project.sourcemaps ? 'source-map' : false,
  output: {
    path: inProject(project.outDir),
    filename: __DEV__ ? '[name].js' : '[name].[chunkhash].js',
    publicPath: project.publicPath,
  },
  resolve: {
    modules: [
      inProject(project.srcDir),
      'node_modules',
    ],
    extensions: ['*', '.js', '.jsx', '.json'],
  },
  externals: project.externals,
  module: {
    rules: [],
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': {
        API_HOST: JSON.stringify(project.API_HOST)
      },
      __DEV__,
      __TEST__,
      __PROD__,
    }, project.globals))
  ],
}

// JavaScript
// ------------------------------------
config.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    query: {
      cacheDirectory: true,
      plugins: [
        'babel-plugin-transform-class-properties',
        'babel-plugin-syntax-dynamic-import',
        [
          'babel-plugin-transform-runtime',
          {
            helpers: true,
            polyfill: false, // we polyfill needed features in src/normalize.js
            regenerator: true,
          },
        ],
        [
          'babel-plugin-transform-object-rest-spread',
          {
            useBuiltIns: true // we polyfill Object.assign in src/normalize.js
          },
        ],
      ],
      presets: [
        'babel-preset-react',
        ['babel-preset-env', {
          targets: {
            ie9: true,
            uglify: true,
            modules: false,
          },
        }],
      ]
    },
  }],
})

// Styles
// ------------------------------------
const extractStyles = new ExtractTextPlugin({
  filename: 'styles/[name].[md5:contenthash:hex:20].css',
  allChunks: true,
  disable: __DEV__,
})

config.module.rules.push({
  test: /\.(sass|scss|css)$/,
  loader: extractStyles.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: project.sourcemaps,
          minimize: {
            autoprefixer: {
              add: true,
              remove: true,
              browsers: ['last 2 versions'],
            },
            discardComments: {
              removeAll : true,
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true,
            sourcemap: project.sourcemaps,
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: project.sourcemaps,
          includePaths: [
            inProjectSrc('styles'),
          ],
        },
      }
    ],
  })
})
config.plugins.push(extractStyles)

// Images
// ------------------------------------
config.module.rules.push({
  test    : /\.(png|jpg|jpeg|gif)$/,
  loader  : 'url-loader',
  options : {
    limit : 8192,
  },
})

// Fonts
// ------------------------------------
;[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml'],
].forEach((font) => {
  const extension = font[0]
  const mimetype = font[1]

  config.module.rules.push({
    test    : new RegExp(`\\.${extension}$`),
    loader  : 'url-loader',
    options : {
      name  : 'fonts/[name].[ext]',
      limit : 10000,
      mimetype,
    },
  })
})

// HTML Template
// ------------------------------------
config.plugins.push(new HtmlWebpackPlugin({
  template: inProjectSrc('index.html'),
  inject: true,
  minify: {
    collapseWhitespace: true,
  },
}))

// Development Tools
// ------------------------------------
if (__DEV__) {
  config.entry.main.push(
    `webpack-hot-middleware/client.js?path=${config.output.publicPath}__webpack_hmr`
  )
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new OpenBrowserPlugin({ url: `http://localhost:${project.port}` })
  )
}

// Bundle Splitting
// ------------------------------------
config.optimization.splitChunks = {
  chunks: "async",
  minSize: 30000,
  minChunks: 1,
  maxAsyncRequests: 5,
  maxInitialRequests: 3,
  automaticNameDelimiter: '~',
  name: true,
  cacheGroups: {
    vendors: {
      test: /[\\/]node_modules[\\/]/,
      chunks: 'all',
      name: 'vendors',
      enforce: true
    },
    default: {
      minChunks: 2,
      priority: -20,
      reuseExistingChunk: true
    }
  }
}

// Production Optimizations
// ------------------------------------
if (__PROD__) {
  config.optimization.minimizer.push(
    new UglifyJsPlugin({
      parallel: true,
      uglifyOptions: {
        ecma: 8
      }
    })
  )
}

module.exports = config
