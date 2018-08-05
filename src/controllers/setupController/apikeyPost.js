import errors from 'restify-errors'
import mongoose from 'mongoose'
import Apikey from '../../dal/entities/apikey/apikeyModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  if (!req.is('application/json')) {
    res.send(new errors.BadRequestError('Expecting application/json'))
    return next()
  }
  
  const apikey = new Apikey({
    enabled: req.body.enabled,
    key: req.body.key,
    client: req.body.client,
    updated: new Date()
  })

  apikey.save((err, item) => {
    if (err) {
      return next(new errors.InternalError(err.message))
    }

    res.send(201, item)
    next()
  })
}