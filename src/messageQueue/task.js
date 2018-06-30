import fs from 'fs'
import config from 'config'
import Rabbit from '../rabbit'

class Task {
  create() {
    if(config.noIntegrationTests) { 
      return new Promise(function(resolve) {
        resolve(fs.readFileSync(__dirname + '/../../mocks/response_templates/valid_result.json', {encoding: 'utf8'}))
      })
    }
    return new Rabbit().createTask('test')
  }
}
export default Task