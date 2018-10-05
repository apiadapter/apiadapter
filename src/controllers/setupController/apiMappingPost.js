import errors from 'restify-errors'
import mongoose from 'mongoose'
import ApiMapping from '../../dal/entities/apiMapping/apiMappingModel'

const ObjectId = mongoose.Types.ObjectId

module.exports = function handler(req, res, next) {
  if (!req.is('application/json')) {
    res.send(new errors.BadRequestError('Expecting application/json'))
    return next()
  }

  const apimapping = new ApiMapping({
    enabled: req.body.enabled,
    schemaName: req.body.schemaName,
    toSchemaName: req.body.toSchemaName,
    fromField: req.body.fromField,
    toField: req.body.toField
  })

  apimapping.save((err, item) => {
    if (err) {
      return next(new errors.InternalError(err.message))
    }

    res.send(201, item)
    next()
  })
}