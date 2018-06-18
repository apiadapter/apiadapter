export default {
  'schemaVersion': 1,
  'routes': {
    'setup': {
      'get': {
        'source': './controllers/setupController/get.js'
      }
    },
    'schema/:name': {
      'get': {
        'source': './controllers/schemaController/get.js'
      }
    },
    'query/:query': {
      'get': {
        'source': './controllers/queryController/get.js'
      }
    }
  }
}
