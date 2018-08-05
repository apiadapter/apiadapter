import errors from 'restify-errors'
import mongoose from 'mongoose'
import Apikey from '../../dal/entities/apikey/apikeyModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  Apikey.findOne({_id: ObjectId(req.params.apikeyId)}, function(err, apikey) {
    if (err) {
      return next(
        new errors.InvalidContentError(err.errors.name.message),
      )
    }
    else {
      res.send(apikey)
      next()
    }
  })
}