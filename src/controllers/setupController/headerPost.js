import errors from 'restify-errors'
import mongoose from 'mongoose'
import Header from '../../dal/entities/headers/headerModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  if (!req.is('application/json')) {
    res.send(new errors.BadRequestError('Expecting application/json'))
    return next()
  }
  
  const header = new Header({
    enabled: req.body.enabled,
    name: req.body.name,
    description: req.body.description,
    key: req.body.key,
    value: req.body.value,
    updated: new Date()
  })

  header.save((err, item) => {
    if (err) {
      return next(new errors.InternalError(err.message))
    }

    res.send(201, item)
    next()
  })
}