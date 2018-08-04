import mongoose from 'mongoose'

const Schema = mongoose.Schema
const headerSchema = mongoose.Schema({
  enabled: {type: Boolean, required: true},
  name: {type: String, required: true},
  description: String,
  key: {type: String, required: true},
  value: {type: String, required: true},
  api: [{type: Schema.Types.ObjectId, ref: 'Api'}],
  deleted: Boolean,
  updated: Date
})
export default headerSchema