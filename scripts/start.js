const logger = require('../config/logger')
const project = require('../config/project')

logger.info('Starting server...')
require('./server').listen(project.port, () => {
  logger.success(`Server is running at http://localhost:${project.port}`)
})
