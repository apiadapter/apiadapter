import errors from 'restify-errors'
import mongoose from 'mongoose'
import ApiMapping from '../../dal/entities/apiMapping/apiMappingModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {

  if (!req.is('application/json')) {
    return next(
      new errors.InvalidContentError('Expects \'application/json\''),
    )}

  let data = req.body || {}
  if (!data._id) {
    data = Object.assign({}, data, {_id: ObjectId(req.params.apimappingId), updated: new Date()})
  }

  ApiMapping.findOne({_id: ObjectId(req.params.apimappingId)}, function(err, apimapping) {
    if(err) {
      if (err) {
        return next(
          new errors.InvalidContentError(err.errors.name.message),
        )
      }
    } else {
      apimapping = Object.assign(apimapping, data)
      apimapping.save(function (err, item) {
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