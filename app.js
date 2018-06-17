import Server from './server.js'
import settings from './config/settings.json'

const server = new Server(settings)
server.start()