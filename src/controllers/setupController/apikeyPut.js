import errors from 'restify-errors'
import mongoose from 'mongoose'
import Apikey from '../../dal/entities/apikey/apikeyModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {

  if (!req.is('application/json')) {
    return next(
      new errors.InvalidContentError('Expects \'application/json\''),
    )}

  let data = req.body || {}
  if (!data._id) {
    data = Object.assign({}, data, {_id: ObjectId(req.params.apikeyId), updated: new Date()})
  }

  Apikey.findOne({_id: ObjectId(req.params.apikeyId)}, function(err, apikey) {
    if(err) {
      if (err) {
        return next(
          new errors.InvalidContentError(err.errors.name.message),
        )
      }
    } else {
      apikey = Object.assign(apikey, data)
      apikey.save(function (err, item) {
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