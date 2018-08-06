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
    'setup/:id/header': {
      'post': {
        'source': './controllers/setupController/headerPost.js'
      }
    },
    'setup/:id/header/:headerId': {
      'get': {
        'source': './controllers/setupController/headerGet.js'
      },
      'put': {
        'source': './controllers/setupController/headerPut.js'
      },
      'delete': {
        'source': './controllers/setupController/headerDelete.js'
      }
    },
    'setup/:id/apikey': {
      'post': {
        'source': './controllers/setupController/apikeyPost.js'
      }
    },
    'setup/:id/apikey/:apikeyId': {
      'get': {
        'source': './controllers/setupController/apikeyGet.js'
      },
      'put': {
        'source': './controllers/setupController/apikeyPut.js'
      },
      'delete': {
        'source': './controllers/setupController/apikeyDelete.js'
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
    'setup/user': {
      'post': {
        'source': './controllers/setupController/userPost.js'
      }
    },
    'setup/authenticate': {
      'post': {
        'source': './controllers/setupController/userAuthenticate.js'
      }
    },
    'setup/user/:id': {
      'get': {
        'source': './controllers/setupController/userGet.js'
      },
      'put': {
        'source': './controllers/setupController/userPut.js'
      },
      'delete': {
        'source': './controllers/setupController/userDelete.js'
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
