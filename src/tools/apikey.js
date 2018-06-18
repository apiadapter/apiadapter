import crypto from 'crypto'
import fs from 'fs'
import config from 'config'

class Apikey {
  create() {
    var current_date = (new Date()).valueOf().toString() 
    var random = Math.random().toString()
    return crypto.createHash('sha1').update(current_date + random).digest('hex')
  }

  validate(hash) {
    if(hash == null) { return false }
    return hash.match(/\b([a-f0-9]{40})\b/) != null ? true : false
  }

  readToken() {
    var token = ''
    if(!fs.existsSync(__dirname + '/../../APIKEY')) {
      token = this.create()
      this.writeToken(token)
    }
    else {
      token = fs.readFileSync(__dirname + '/../../APIKEY', {encoding: 'utf8'})
      if(!this.validate(token)) {
        throw ('Invalid master apikey!, existing...')
      }
    }
    return token
  }

  writeToken(hash) {
    fs.writeFileSync(__dirname + '/../../APIKEY', hash)
    if(config.util.getEnv('NODE_ENV') !== 'test') {
      console.log('New master apikey generated: ' + hash)
    }
  }

}
export default Apikey