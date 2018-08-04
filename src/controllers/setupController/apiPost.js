import errors from 'restify-errors'
import Api from '../../dal/entities/api/apiModel'

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
    updated: new Date()
  })
  api.save((err, item) => {
    if (err) {
      return next(new errors.InternalError(err.message))
    }

    res.send(201, item)
    next()
  })
}