import errors from 'restify-errors'
import mongoose from 'mongoose'
import PasswordHash from 'password-hash'
import RandomString from 'randomstring'
import User from '../../dal/entities/user/userModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  if (!req.is('application/json')) {
    res.send(new errors.BadRequestError('Expecting application/json'))
    return next()
  }
  
  const data = req.body || {}
  const user = new User(data)
  user.salt = RandomString.generate()
  user.password = PasswordHash.generate(user.password + user.salt)
  user.save((err, item) => {
    if (err) {
      return next(new errors.InternalError(err.message))
    }

    res.send(201, item)
    next()
  })
}