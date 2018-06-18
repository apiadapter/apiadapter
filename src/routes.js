export default {
  'schemaVersion': 1,
  'routes': {
    'setup': {
      'get': {
        'source': './setup/get.js'
      }
    },
    'schema/:name': {
      'get': {
        'source': './schema/get.js'
      }
    }
  }
}
