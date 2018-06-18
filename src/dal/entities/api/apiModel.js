import mongoose from 'mongoose'
import apiSchema from './apiSchema'

const Api = mongoose.model('Api', apiSchema)
export default Api