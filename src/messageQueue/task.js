import fs from 'fs'
import Rabbit from '../rabbit'

class Task {
  create(query) {
    return new Rabbit().createTask(query)
  }
}
export default Task