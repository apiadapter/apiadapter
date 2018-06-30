import mongoose from 'mongoose'
import apitypeSchema from './apitypeSchema'

const Apitype = mongoose.model('Apitype', apitypeSchema)
export default Apitype