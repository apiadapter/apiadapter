export default {
  'schemaVersion': 1,
  'routes': {
    'setup/:id/api': {
      'post': {
        'source': './controllers/setupController/apiPost.js'
      }
    },
    'setup/:id/api/:apiId': {
      'get': {
        'source': './controllers/setupController/apiGet.js'
      },
      'put': {
        'source': './controllers/setupController/apiPut.js'
      },
      'delete': {
        'source': './controllers/setupController/apiDelete.js'
      }
    },
    'setup': {
      'post': {
        'source': './controllers/setupController/clientPost.js'
      }
    },
    'setup/:id': {
      'get': {
        'source': './controllers/setupController/clientGet.js'
      },
      'put': {
        'source': './controllers/setupController/clientPut.js'
      },
      'delete': {
        'source': './controllers/setupController/clientDelete.js'
      }
    },
    'setup/:id/apitype': {
      'post': {
        'source': './controllers/setupController/apitypePost.js'
      }
    },
    'setup/:id/apitype/:apitypeId': {
      'get': {
        'source': './controllers/setupController/apitypeGet.js'
      },
      'put': {
        'source': './controllers/setupController/apitypePut.js'
      },
      'delete': {
        'source': './controllers/setupController/apitypeDelete.js'
      }
    },
    'setup/:id/apimapping': {
      'post': {
        'source': './controllers/setupController/apiMappingPost.js'
      }
    },
    'setup/:id/apimapping/:apimappingId': {
      'get': {
        'source': './controllers/setupController/apiMappingGet.js'
      },
      'put': {
        'source': './controllers/setupController/apiMappingPut.js'
      },
      'delete': {
        'source': './controllers/setupController/apiMappingDelete.js'
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
