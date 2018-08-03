import mongoose from 'mongoose'

const Schema = mongoose.Schema
const apiMappingSchema = mongoose.Schema({
  enabled: {type: Boolean, required: true},
  schemaName: {type: String, required: true},
  fromField: {type: String, required: true},
  toField: {type: String, required: true},
  updated: Date,
  deleted: Boolean
})
export default apiMappingSchema