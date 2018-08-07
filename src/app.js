import config from 'config'
import mongoose from 'mongoose'
import Database from './db'
import Server from './server.js'
import Apikey from './tools/apikey'
import Rabbit from './rabbit'
import Apitype from './dal/entities/apitype/apitypeModel'

const apikey = new Apikey()
config.apikey = apikey.readToken()
const server = new Server(config)
new Database().connect()
new Rabbit().emailConsumer()
new Rabbit().consumer()

server.start()