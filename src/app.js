import settings from '../config/settings.json'
import Server from './server.js'
import Apikey from './tools/apikey'

const apikey = new Apikey()
settings.apikey = apikey.readToken()
const server = new Server(settings)
server.start()