import crypto from 'crypto'
import fs from 'fs'

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
    return fs.readFileSync(__dirname + '/../../APIKEY', {encoding: 'utf8'})
  }
}
export default Apikey