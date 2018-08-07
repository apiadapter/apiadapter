import mongoose from 'mongoose'
import UniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema
const userSchema = mongoose.Schema({
  enabled: {type: Boolean, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true, unique: true, index: true},
  password: {type: String, required: true, minlength: 6},
  salt: {type: String, required: true},
  userConfirmed: Boolean,
  passwordResetExpireDate: Date,
  verificationToken: String,
  client: [{type: Schema.Types.ObjectId, ref: 'Client'}],
  deleted: Boolean,
  updated: Date
})

userSchema.plugin(UniqueValidator)
export default userSchema