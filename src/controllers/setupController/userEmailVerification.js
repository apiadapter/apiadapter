import errors from 'restify-errors'
import User from '../../dal/entities/user/userModel'

module.exports = function handler(req, res, next) {
  if (!req.is('application/json')) {
    res.send(new errors.BadRequestError('Expecting application/json'))
    return next()
  }
  
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      return next(
        new errors.InvalidContentError(err),
      )
    }
    else {
      user.emailConfirmed = true
      user.updated = new Date()
      user.save(function(err,item) {
        if (err) {
          return next(
            new errors.InvalidContentError(err),
          )
        }
        res.send(200, {'email': 'confirmed'})
        next()
      })
    }
  })
}