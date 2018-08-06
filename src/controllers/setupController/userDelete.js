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
      let data = Object.assign({}, data, {_id: ObjectId(req.params.id), updated: new Date(), deleted: true})
      user = Object.assign(user, data)
      user.save(function (err, item) {
        if (err) {
          return next(
            new errors.InvalidContentError(err.errors.name.message),
          )
        }
        else {
          res.send(202)
          next()
        }
      })
    }
  })
}