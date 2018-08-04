import errors from 'restify-errors'
import mongoose from 'mongoose'
import Api from '../../dal/entities/api/apiModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  if (!req.is('application/json')) {
    res.send(new errors.BadRequestError('Expecting application/json'))
    return next()
  }
  
  const api = new Api({
    enabled: true,
    name: req.body.name,
    address: req.body.address,
    port: req.body.port,
    requireHeaders: req.body.requireHeaders,
    updated: new Date(), 
    client: ObjectId(req.params.id)
  })

  api.save((err, item) => {
    if (err) {
      return next(new errors.InternalError(err.message))
    }

    res.send(201, item)
    next()
  })
}