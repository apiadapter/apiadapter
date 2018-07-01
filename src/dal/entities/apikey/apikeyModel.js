import mongoose from 'mongoose'
import apikeySchema from './apikeySchema'

const Apikey = mongoose.model('Apikey', apikeySchema)
export default Apikey