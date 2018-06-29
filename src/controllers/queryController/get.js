import fs from 'fs'
import errors from 'restify-errors'
import Validate from '../../validate/validate'

module.exports =  function handler(req, res, next) {
  var params = req.params
  var validate = new Validate()
  var querySchema = fs.readFileSync(__dirname + '/../../schemas/query.json', {encoding: 'utf8'})

  try {
    var query = JSON.parse(params.query)
    if(!validate.query(JSON.parse(params.query), JSON.parse(querySchema))) {
      res.send(new errors.BadRequestError('Invalid query'))
    } else {
      console.log(query)
      try {
        fs.accessSync(__dirname + '/../../schemas/' + query.queryType.toLowerCase() + '.json', fs.F_OK)
        if(query.includes) {
          for(var i = 0; i < query.includes.length; i++) {
            fs.accessSync(__dirname + '/../../schemas/' + query.includes[i].toLowerCase() + '.json', fs.F_OK)
          }
        }
        res.send(200, 'Forward to messagequeue') //TODO break message to messagequeue

      } catch(e) {
        res.send(new errors.BadRequestError('Querytype not found!' + '\r\n' + e))
      }
    }
  }
  catch (e) {
    res.send(new errors.BadRequestError(e))
  }
  finally {
    next()
  }
}
