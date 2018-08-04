import errors from 'restify-errors'
import mongoose from 'mongoose'
import Api from '../../dal/entities/api/apiModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  Api.findOne({_id: ObjectId(req.params.id)}, function(err, api) {
    if (err) {
      return next(
        new errors.InvalidContentError(err.errors.name.message),
      )
    }
    else {
      res.send(api)
      next()
    }
  })
}