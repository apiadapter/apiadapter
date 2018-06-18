import fs from 'fs'
import errors from 'restify-errors'
import Validate from '../../validate/validate'

module.exports =  function handler(req, res, next) {
  var params = req.params
  var validate = new Validate()
  var querySchema = fs.readFileSync(__dirname + '/../../schemas/query.json', {encoding: 'utf8'})

  try {
    JSON.parse(params.query)
    if(!validate.query(JSON.parse(params.query), JSON.parse(querySchema))) {
      res.send(new errors.BadRequestError('Invalid query'))
    } else {
      res.send(200,'foobar')
    }
  }
  catch (e) {
    res.send(new errors.BadRequestError('Invalid query'))
  }
  finally {
    next()
  }
}
