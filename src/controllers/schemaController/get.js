import fs from 'fs'

module.exports =  function handler(req, res, next) {
  const schemaDir = __dirname + '/../../schemas/'
  var params = req.params
  if (!params.name || !params.name.toString().toLowerCase().match(/[a-z].json$/)) {
    res.send(500)
    next()
  }
  else {
    const schemaName = params.name
    var files = fs.readdirSync(schemaDir)
    let schemaIndex = files.indexOf(schemaName)
    if (schemaIndex < 0) {
      res.send(404)
    }
    else {
      fs.readFile(schemaDir + schemaName, {encoding: 'utf8'}, function (err, data) {
        res.send(200, JSON.parse(data))
      })
    }
    next()
  }
}