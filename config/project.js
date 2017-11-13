/* eslint-disable */
const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  /** The environment to use when building the project */
  env: NODE_ENV,
  /** Default project run port **/
  port: 3000,
  /** The full path to the project's root directory */
  basePath: `${__dirname}/../`,
  /** Host name **/
  API_HOST: NODE_ENV !== 'development' || process.env.API_HOST ? process.env.API_HOST : 'api.unkata.com',
  /** The name of the directory containing the application source code */
  srcDir: 'src',
  /** The file name of the application's entry point */
  main: 'index',
  /** The name of the directory in which to emit compiled assets */
  outDir: 'dist',
  /** The base path for all projects assets (relative to the website root) */
  publicPath: '/',
  /** Whether to generate sourcemaps */
  sourcemaps: true,
  /** A hash map of keys that the compiler should treat as external to the project */
  externals: {},
  /** A hash map of variables and their values to expose globally */
  globals: {},
  /** Whether to enable verbose logging */
  verbose: false,
  /** The list of modules to bundle separately from the core application code */
  vendors: [
    "axios",
    "classnames",
    "compression",
    "dom-helpers",
    "material-ui",
    "material-ui-icons",
    "moment",
    "object-assign",
    "promise",
    "prop-types",
    "ramda",
    "react",
    "react-animations",
    "react-autosuggest",
    "react-dom",
    "react-jss",
    "react-redux",
    "react-router",
    "react-router-redux",
    "react-transition-group",
    "recompose",
    "redux",
    "redux-auth-wrapper",
    "redux-form",
    "redux-promise-middleware",
    "redux-thunk",
    "rxjs",
    "sprintf"
  ],
}
