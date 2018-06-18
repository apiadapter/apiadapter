import fs from 'fs'
import settings from '../config/settings.json'
import Server from './server.js'
import Apikey from './tools/apikey'

const apikey = new Apikey()

if(!fs.existsSync(__dirname + '/../APIKEY')) {
  var hash = apikey.create()
  fs.writeFileSync(__dirname + '/../APIKEY', hash)
  settings.apikey = hash
  console.log('New master apikey generated: ' + hash)
} else {
  var APIKEY = fs.readFileSync(__dirname + '/../APIKEY', {encoding: 'utf8'})
  if(apikey.validate(APIKEY)) {
    settings.apikey = APIKEY
    console.log('Existing master apikey found: ' + settings.apikey)
  } else {
    throw ('Invalid master apikey!, existing...')
  }
}
const server = new Server(settings)
server.start()