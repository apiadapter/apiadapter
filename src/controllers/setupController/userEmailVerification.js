import errors from 'restify-errors'
import mongoose from 'mongoose'
import User from '../../dal/entities/user/userModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  if (!req.is('application/json')) {
    res.send(new errors.BadRequestError('Expecting application/json'))
    return next()
  }
  User.findOne({_id: ObjectId(req.params.id)}, function(err, user) {
    if (err) {
      return next(
        new errors.InvalidContentError(err),
      )
    }
    else {
      user.userConfirmed = true
      user.updated = new Date()
      user.save(function(err,item) {
        if (err) {
          return next(
            new errors.InvalidContentError(err),
          )
        }
        res.send(200, {'email': 'confirmed'})
        next()
      })
    }
  })
}