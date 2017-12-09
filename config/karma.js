const argv = require('yargs').argv
const webpackConfig = require('./webpack')

const TEST_BUNDLER = './tests/test-bundler.js'

const karmaConfig = {
  basePath: '../',
  browsers: ['ChromeHeadless'],
  customLaunchers: {
    ChromeHeadless: {
      base: 'Chrome',
      flags: [
        '--disable-gpu',
        '--headless',
        '--no-sandbox',
        '--remote-debugging-port=9222',
      ],
    },
  },
  singleRun: !argv.watch,
  coverageReporter: {
    reporters: [
      { type: 'text-summary' },
    ],
  },
  files: [{
    pattern  : TEST_BUNDLER,
    watched  : false,
    served   : true,
    included : true
  }],
  frameworks: ['mocha'],
  reporters: ['mocha'],
  preprocessors: {
    [TEST_BUNDLER]: ['webpack'],
  },
  logLevel: 'WARN',
  browserConsoleLogOptions: {
    terminal: true,
    format: '%b %T: %m',
    level: '',
  },
  webpack: {
    entry: TEST_BUNDLER,
    devtool: 'cheap-module-source-map',
    module: webpackConfig.module,
    plugins: webpackConfig.plugins,
    resolve: webpackConfig.resolve,
    externals: {
      'react/addons': 'react',
      'react/lib/ExecutionEnvironment': 'react',
      'react/lib/ReactContext': 'react',
    },
  },
  webpackMiddleware: {
    stats: 'errors-only',
    noInfo: true,
  },
}

module.exports = (cfg) => cfg.set(karmaConfig)
