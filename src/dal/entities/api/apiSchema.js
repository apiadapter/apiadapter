import mongoose from 'mongoose'

const Schema = mongoose.Schema
const apiSchema = mongoose.Schema({
  enabled: Boolean,
  name: String,
  description: String,
  type: String,
  address: String,
  port: Number,
  requireHeaders: Boolean,
  headers: [{type: Schema.Types.ObjectId, ref: 'Header'}],
  api: {type: Schema.Types.ObjectId, ref: 'Apitype'},
  updated: Date,
  _id: Number
})
export default apiSchema