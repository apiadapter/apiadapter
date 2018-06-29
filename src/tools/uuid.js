class Uuid {
  create() {
    return Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  }
}
export default Uuid