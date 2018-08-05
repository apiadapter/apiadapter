import errors from 'restify-errors'
import mongoose from 'mongoose'
import Apitype from '../../dal/entities/apitype/apitypeModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  Apitype.findOne({_id: ObjectId(req.params.apitypeId)}, function(err, apitype) {
    if (err) {
      return next(
        new errors.InvalidContentError(err.errors.name.message),
      )
    }
    else {
      let data = Object.assign({}, data, {_id: ObjectId(req.params.apitypeId), updated: new Date(), deleted: true})
      apitype = Object.assign(apitype, data)
      apitype.save(function (err, item) {
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