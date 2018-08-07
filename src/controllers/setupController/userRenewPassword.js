import errors from 'restify-errors'
import mongoose from 'mongoose'
import PasswordHash from 'password-hash'
import RandomString from 'randomstring'
import User from '../../dal/entities/user/userModel'
import EmailHandler from '../../email/emailHandler'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  if (!req.is('application/json')) {
    res.send(new errors.BadRequestError('Expecting application/json'))
    return next()
  }
  User.findOne({_id: ObjectId(req.body._id)}, function(err, user) {
    if (err) {
      return next(
        new errors.InvalidContentError(err.errors.name.message),
      )
    }
    if(typeof(user.passwordResetExpireDate) == 'undefined' || user.passwordResetExpireDate < new Date() || user.passwordResetExpireDate == null) {
      return next(new errors.ForbiddenError('Password reset token expired!'))
    }
    user.passwordResetExpireDate = null
    user.salt = RandomString.generate()
    user.password = PasswordHash.generate(req.body.password + user.salt)
    user.updated = new Date()
    user.save((err, item) => {
      if (err) {
        return next(new errors.InternalError(err.message))
      }
      res.send(201, item)
      next()
    })
  })
}