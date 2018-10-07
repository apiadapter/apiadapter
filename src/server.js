import restify from 'restify'
import errors from 'restify-errors'
import enroute from 'restify-enroute'
import morgan from 'morgan'
import config from 'config'
import mongoose from 'mongoose'
import Routes from './routes.js'
import Apikey from './tools/apikey'
import ApikeyModel from './dal/entities/apikey/apikeyModel'

const ObjectId = mongoose.Types.ObjectId

class Server {
  constructor (settings) {
    this.port = settings.port
    this.name = settings.name
    this.version = settings.version
    this.useAuth = settings.useAuth
    this.server = restify.createServer({
      name: this.name,
      version: this.version,
      maxParamLength: 10000
    })
    this.server = this.initializeServer(this.server)
  }

  initializeServer(server) {
    server.use(restify.plugins.acceptParser(server.acceptable))
    server.use(restify.plugins.queryParser({parameterLimit: 5000}))
    server.use(restify.plugins.bodyParser())
    if(config.util.getEnv('NODE_ENV') !== 'test') {
      server.use(morgan('combined'))
    }
    
    if(this.useAuth) {
      server.use(restify.plugins.authorizationParser())
      server.use(this.authorization)
    }
    return server
  }

  async authorization(req,res,next) {
    const apikey_header = req.header('X-API-KEY')
  
    //Check that apikey header is given
    if(typeof(apikey_header) === 'undefined' || apikey_header.length < 1)  {
      return next(new errors.UnauthorizedError('Invalid token or token missing'))
    }
    let result = await ApikeyModel.findOne({key: apikey_header, enabled: true})

    if(apikey_header === new Apikey().readToken() || result !== null) {
      next()
    } else {
      return next(new errors.UnauthorizedError('Invalid token or token missing'))
    }
  }

  test() {
    let testServer = restify.createServer({maxParamLength: 10000})
    testServer = this.initializeServer(testServer)
    enroute.install({
      config: Routes,
      server: testServer,
      basePath: __dirname}, function() { })

    return testServer
  }

  start() {
    let port = this.port
    let server = this.server
    enroute.install({
      config: Routes,
      server: server,
      basePath: __dirname}, function(err){
      if (err) {
        console.error('unable to install routes')
      } else {
        console.log('routes installed')
        server.listen(port, function() {
          console.log('%s listening at %s', server.name, server.url)
        })
      }
    })
  }
}

export default Server
