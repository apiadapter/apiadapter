import errors from 'restify-errors'
import mongoose from 'mongoose'
import Api from '../../dal/entities/api/apiModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {

  if (!req.is('application/json')) {
    return next(
      new errors.InvalidContentError('Expects \'application/json\''),
    )}

  let data = req.body || {}
  if (!data._id) {
    data = Object.assign({}, data, {_id: ObjectId(req.params.apiId), updated: new Date()})
  }

  Api.findOne({_id: ObjectId(req.params.apiId)}, function(err, api) {
    if(err) {
      if (err) {
        return next(
          new errors.InvalidContentError(err.errors.name.message),
        )
      }
    } else {
      api = Object.assign(api, data)
      api.save(function (err, item) {
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