import errors from 'restify-errors'
import mongoose from 'mongoose'
import User from '../../dal/entities/user/userModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  User.findOne({_id: ObjectId(req.params.id)}, function(err, user) {
    if (err) {
      return next(
        new errors.InvalidContentError(err.errors.name.message),
      )
    }
    else {
      res.send(user)
      next()
    }
  })
}