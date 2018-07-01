import mongoose from 'mongoose'

const Schema = mongoose.Schema
const apitypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  apis: [{type: Schema.Types.ObjectId, ref: 'Api'}]
})
export default apitypeSchema