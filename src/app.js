import settings from '../config/settings.json'
import Server from './server.js'

const server = new Server(settings)
server.start()