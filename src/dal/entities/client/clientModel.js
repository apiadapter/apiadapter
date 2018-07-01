import mongoose from 'mongoose'
import clientSchema from './clientSchema'

const Client = mongoose.model('Client', clientSchema)
export default Client