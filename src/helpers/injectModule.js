import _ from 'lodash'
import { injectReducer } from '../store/reducers'

export const injectModule = (require, store, cb, { container, module, reducer }) => {
  const [containerRouteName, containerName] = _.split(container, '/')
  const [moduleRouteName, moduleName] = _.split(module, '/')
  const _container = require('../routes/' + containerRouteName + '/containers/' + containerName).default
  const _reducer = require('../routes/' + moduleRouteName + '/modules/' + moduleName).default
  injectReducer(store, { key: reducer, _reducer })

  cb(null, _container)
}
