import Rabbit from '../rabbit'

class Task {
  create() {
    return new Rabbit().createTask('test')
  }
}
export default Task