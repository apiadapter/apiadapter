import errors from 'restify-errors'
import RandomString from 'randomstring'
import User from '../../dal/entities/user/userModel'
import Email from '../../messageQueue/email'

module.exports = function handler(req, res, next) {
  if (!req.is('application/json')) {
    res.send(new errors.BadRequestError('Expecting application/json'))
    return next()
  }
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      return next(
        new errors.InvalidContentError(err.errors.name.message),
      )
    }
    else {
      var date = new Date()
      date.setDate(date.getDate() + 2)
      user.verificationToken = RandomString.generate()
      user.passwordResetExpireDate = date
      user.updated = new Date()
      user.save(function(err,item) {
        const email = new Email()
        email.send({
          template: 'resetPassword',
          user: {
            firstName: item.firstName,
            lastName: item.lastName,
            email: item.email
          },
          data: {
            resetLink: item.verificationToken
          }
        })
        res.send(201, {'passwordReset': 'sent'})
        next()
      })
    }
  })
}