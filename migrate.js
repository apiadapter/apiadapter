const config = require('config')

module.exports = {
  dbConnectionUri : config.connectionstring,
  migrationsDir: 'migrations',
  es6: true
}