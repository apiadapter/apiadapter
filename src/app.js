import config from 'config'
import Database from './db'
import Server from './server.js'
import Apikey from './tools/apikey'
import Rabbit from './rabbit'

const apikey = new Apikey()
config.apikey = apikey.readToken()
const server = new Server(config)
new Database().connect()
new Rabbit().initialize()
server.start()