import mongoose from 'mongoose'

const Schema = mongoose.Schema
const userSchema = mongoose.Schema({
  enabled: {type: Boolean, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true, minlength: 6},
  userConfirmed: Boolean,
  passwordResetExpireDate: Date,
  client: [{type: Schema.Types.ObjectId, ref: 'Client'}],
  deleted: Boolean,
  updated: Date
})
export default userSchema