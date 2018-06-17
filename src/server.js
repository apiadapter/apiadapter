import restify from 'restify'
import enroute from 'restify-enroute'
import Routes from './routes.js'

class Server {
  constructor (settings) {
    this.port = settings.port
    this.name = settings.name
    this.version = settings.version
  }

  start() {
    let server = restify.createServer({
      name: this.name,
      version: this.version
    })
    let port = this.port
    server.use(restify.plugins.acceptParser(server.acceptable))
    server.use(restify.plugins.queryParser())
    server.use(restify.plugins.bodyParser())

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
