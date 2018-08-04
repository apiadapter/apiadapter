import errors from 'restify-errors'
import mongoose from 'mongoose'
import Client from '../../dal/entities/client/clientModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  Client.findOne({_id: ObjectId(req.params.id)}, function(err, api) {
    if (err) {
      return next(
        new errors.InvalidContentError(err.errors.name.message),
      )
    }
    else {
      let data = Object.assign({}, data, {_id: ObjectId(req.params.id), updated: new Date(), deleted: true})
      api = Object.assign(api, data)
      api.save(function (err, item) {
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