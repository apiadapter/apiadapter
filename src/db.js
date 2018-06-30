import mongoose from 'mongoose'
import config from 'config'
import Apitype from './dal/entities/apitype/apitypeModel'

class Database {
  connect() {
    //db options
    let options = { 
      connectTimeoutMS: 30000,
      keepAlive: 1
    } 
    mongoose.connect(config.connectionstring, options)
    let db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error:'))
  }
}
export default Database