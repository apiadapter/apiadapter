import mongoose from 'mongoose'

const Schema = mongoose.Schema
const apiSchema = mongoose.Schema({
  enabled: Boolean,
  name: String,
  description: String,
  type: String,
  address: String,
  port: Number,
  updated: Date,
  endpoints: Schema.Types.Mixed,
  _id: Schema.Types.ObjectId
})
export default apiSchema