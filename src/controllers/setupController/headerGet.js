import errors from 'restify-errors'
import mongoose from 'mongoose'
import Header from '../../dal/entities/headers/headerModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  Header.findOne({_id: ObjectId(req.params.headerId)}, function(err, client) {
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