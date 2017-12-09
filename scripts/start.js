const logger = require('../config/logger')
const project = require('../config/project')
const openBrowser = require('react-dev-utils/openBrowser')

logger.info('Starting server...')
require('./server').listen(project.port, () => {
  logger.success(`Server is running at http://localhost:${project.port}`)

  if (project.env === 'development' && openBrowser(`http://localhost:${project.port}`)) {
    logger.success('The browser tab has been opened!');
  }
})
