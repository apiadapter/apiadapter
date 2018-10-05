import errors from 'restify-errors'
import mongoose from 'mongoose'
import ApiMapping from '../../dal/entities/apiMapping/apiMappingModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  ApiMapping.findOne({_id: ObjectId(req.params.apimappingId)}, function(err, apimapping) {
    if (err) {
      return next(
        new errors.InvalidContentError(err.errors.name.message),
      )
    }
    else {
      res.send(apimapping)
      next()
    }
  })
}