import mongoose from 'mongoose'

const Schema = mongoose.Schema
const headerSchema = mongoose.Schema({
  enabled: Boolean,
  name: String,
  description: String,
  key: String,
  value: String,
  api: {type: Number, ref: 'Api'}
})
export default headerSchema