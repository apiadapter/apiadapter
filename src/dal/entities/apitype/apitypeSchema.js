import mongoose from 'mongoose'

const Schema = mongoose.Schema
const apitypeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  apis: [{type: Number, ref: 'Api'}]
})
export default apitypeSchema