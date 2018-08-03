var fs = require('fs')
var config = require('../config/test.json')
var queryTemplate = require('../src/schemas/Query.json')
var resultTemplate = require('../src/schemas/Result.json')

var schemaDir = __dirname + '/../src/schemas/'
var files = fs.readdirSync(schemaDir)
var newSchamas = []

queryTemplate.properties.filter = {anyOf: []}
resultTemplate.properties.results.items = {anyOf: []}
files.forEach(function(item) {
  if(item != 'Result.json' && item != 'Query.json' && item != 'ResourceInfo.json') {
    var templateName = item.split('.')[0]
    newSchamas.push(templateName)
    queryTemplate.properties.filter.anyOf.push(config.schemaRepository + item)
    resultTemplate.properties.results.items.anyOf.push({$ref: config.schemaRepository + item})
  }
})
queryTemplate.properties.queryType.enum = newSchamas
queryTemplate.properties.includes.items.enum = newSchamas

fs.writeFile('./src/schemas/Query.json', JSON.stringify(queryTemplate), (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('Query.json has been created')
})

fs.writeFile('./src/schemas/Result.json', JSON.stringify(resultTemplate), (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('Result.json has been created')
})

