import mongoose from 'mongoose'
import apiMappingSchema from './apiMappingSchema'

const ApiMapping = mongoose.model('ApiMapping', apiMappingSchema)
export default ApiMapping