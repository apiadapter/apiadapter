import restify from 'restify'
import enroute from 'restify-enroute'
import Routes from './routes.js'

class Server {
  constructor (settings) {
    this.port = settings.port
    this.name = settings.name
    this.version = settings.version
    this.server = restify.createServer({
      name: this.name,
      version: this.version
    })
    this.server.use(restify.plugins.acceptParser(this.server.acceptable))
    this.server.use(restify.plugins.queryParser())
    this.server.use(restify.plugins.bodyParser())
  }

  test() {
    let testServer = restify.createServer()
    enroute.install({
      config: Routes,
      server: testServer,
      basePath: __dirname}, function() {})
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
