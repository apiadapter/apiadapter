import restify from 'restify'
import errors from 'restify-errors'
import enroute from 'restify-enroute'
import morgan from 'morgan'
import config from 'config'
import Routes from './routes.js'
import Apikey from './tools/apikey'

class Server {
  constructor (settings) {
    this.port = settings.port
    this.name = settings.name
    this.version = settings.version
    this.useAuth = settings.useAuth
    this.server = restify.createServer({
      name: this.name,
      version: this.version
    })
    this.server = this.initializeServer(this.server)
  }

  initializeServer(server) {
    server.use(restify.plugins.acceptParser(server.acceptable))
    server.use(restify.plugins.queryParser())
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

  authorization(req,res,next) {
    if(req.header('X-API-KEY') !== new Apikey().readToken()) {
      return next(new errors.UnauthorizedError('Invalid token or token missing'))
    } else {
      next()
    }
  }

  test() {
    let testServer = restify.createServer()
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
