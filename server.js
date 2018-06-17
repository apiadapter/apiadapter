import restify from 'restify'

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

    server.use(restify.plugins.acceptParser(server.acceptable))
    server.use(restify.plugins.queryParser())
    server.use(restify.plugins.bodyParser())

    server.listen(this.port, function() {
      console.log('%s listening at %s', server.name, server.url)
    })
  }
}

export default Server
