import rabbit from 'amqplib'
import config from 'config'

class Rabbit {
  constructor () {
    this.connection = rabbit.connect(config.rabbitHost)
    console.log('Connected to RabbitMQ')    
  }

  initialize() {
    this.connection.then(function(conn) {
      return conn.createChannel().then(function(ch) {
        var q = 'api_queue'
        ch.assertQueue(q, {durable: false})
      })
    })
  }
}
export default Rabbit