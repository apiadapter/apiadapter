import config from 'config'
import Database from './db'
import Server from './server.js'
import Apikey from './tools/apikey'

const apikey = new Apikey()
config.apikey = apikey.readToken()
const server = new Server(config)
new Database().connect()
server.start()