import mongoose from 'mongoose'

const Schema = mongoose.Schema
const clientSchema = mongoose.Schema({
  enabled: {type: Boolean, required: true},
  name: {type: String, required: true},
  apikeys: [{type: Schema.Types.ObjectId, ref: 'Apikey'}],
  apis: {type: Schema.Types.ObjectId, ref: 'Api'},
  updated: Date,
  deleted: Boolean
})
export default clientSchema