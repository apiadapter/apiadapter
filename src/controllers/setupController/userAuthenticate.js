import errors from 'restify-errors'
import mongoose from 'mongoose'
import PasswordHash from 'password-hash'
import User from '../../dal/entities/user/userModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      return next(
        new errors.InvalidContentError(err.errors.name.message),
      )
    }
    else {
      const authenticated = PasswordHash.verify(req.body.password + user.salt, user.password)
      if(!authenticated) {
        return next(
          new errors.NotAuthorizedError('Wrong email or password'),
        )
      }
      if(!user.userConfirmed) {
        return next(
          new errors.NotAuthorizedError('email not confirmed!'),
        )
      }
      res.send(200,user)
      next()
    }
  })
}