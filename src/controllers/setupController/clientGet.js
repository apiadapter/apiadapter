import errors from 'restify-errors'
import mongoose from 'mongoose'
import Client from '../../dal/entities/client/clientModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  Client.findOne({_id: ObjectId(req.params.id)}, function(err, client) {
    if (err) {
      return next(
        new errors.InvalidContentError(err.errors.name.message),
      )
    }
    else {
      res.send(client)
      next()
    }
  })
}