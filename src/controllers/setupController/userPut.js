import errors from 'restify-errors'
import mongoose from 'mongoose'
import PasswordHash from 'password-hash'
import RandomString from 'randomstring'
import User from '../../dal/entities/user/userModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {

  if (!req.is('application/json')) {
    return next(
      new errors.InvalidContentError('Expects \'application/json\''),
    )}

  let data = req.body || {}
  if (!data._id) {
    data = Object.assign({}, data, {_id: ObjectId(req.params.id), updated: new Date()})
  }

  User.findOne({_id: ObjectId(req.params.id)}, function(err, user) {
    if(err) {
      if (err) {
        return next(
          new errors.InvalidContentError(err.errors.name.message),
        )
      }
    } else {
      user = Object.assign(user, data)
      user.salt = RandomString.generate()
      user.password = PasswordHash.generate(user.password + user.salt)
      user.save(function (err, item) {
        if (err) {
          return next(
            new errors.InvalidContentError(err.errors.name.message),
          )
        }
        else {
          res.send(200, item)
          next()
        }
      })
    }
  })
}