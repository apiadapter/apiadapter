import errors from 'restify-errors'
import mongoose from 'mongoose'
import Client from '../../dal/entities/client/clientModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  if (!req.is('application/json')) {
    res.send(new errors.BadRequestError('Expecting application/json'))
    return next()
  }
  
  const client = new Client({
    enabled: true,
    name: req.body.name,
    updated: new Date()
  })

  client.save((err, item) => {
    if (err) {
      return next(new errors.InternalError(err.message))
    }

    res.send(201, item)
    next()
  })
}