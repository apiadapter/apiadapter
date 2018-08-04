import mongoose from 'mongoose'

const Schema = mongoose.Schema
const apiSchema = mongoose.Schema({
  enabled: {type: Boolean, required: true},
  name: {type: String, required: true},
  description: String,
  address: {type: String, required: true},
  port: {type: Number, required: true},
  requireHeaders: {type: Boolean, required: true},
  headers: [{type: Schema.Types.ObjectId, ref: 'Header'}],
  type: {type: Schema.Types.ObjectId, ref: 'Apitype'},
  client: {type: Schema.Types.ObjectId, ref: 'Client', required: true},
  updated: Date,
  deleted: Boolean
})
export default apiSchema