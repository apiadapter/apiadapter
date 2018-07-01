import mongoose from 'mongoose'

const Schema = mongoose.Schema
const apikeySchema = mongoose.Schema({
  enabled: {type: Boolean, required: true},
  key: {type: String, required: true},
  client: {type: Schema.Types.ObjectId, ref: 'Client'},
  updated: Date,
  deleted: Boolean
})
export default apikeySchema