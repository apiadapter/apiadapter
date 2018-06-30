import fs from 'fs'
import Rabbit from '../rabbit'

class Task {
  create(query) {
    if((process.env.INTEGRATION_TESTS == 'false')) { 
      return new Promise(function(resolve) {
        resolve(fs.readFileSync(__dirname + '/../../mocks/response_templates/valid_result.json', {encoding: 'utf8'}))
      })
    }
    return new Rabbit().createTask(query)
  }
}
export default Task