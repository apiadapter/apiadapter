import fs from 'fs'
import settings from '../config/settings.json'
import Server from './server.js'
import Apikey from './tools/apikey'

const server = new Server(settings)
const apikey = new Apikey()

if(!fs.existsSync(__dirname + '/../APIKEY')) {
  var hash = apikey.create()
  fs.writeFileSync(__dirname + '/../APIKEY', hash)
  settings.APIKEY = hash
  console.log('New master apikey generated: ' + hash)
} else {
  var APIKEY = fs.readFileSync(__dirname + '/../APIKEY', {encoding: 'utf8'})
  if(apikey.validate(APIKEY)) {
    settings.APIKEY = APIKEY
    console.log('Existing master apikey found: ' + settings.APIKEY)
  } else {
    throw ('Invalid master apikey!, existing...')
  }
}
server.start()