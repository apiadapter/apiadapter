import rabbit from 'amqplib'
import config from 'config'
import Promise from 'bluebird'
import Uuid from './tools/uuid'

class Rabbit {
  constructor () {
    this.queue = 'api_queue'
  }

  consumer() {
    var queue = this.queue
    rabbit.connect(config.rabbitHost).then(function(conn) {
      conn.createChannel().then(function(ch) { 
        var ok = ch.assertQueue(queue, {durable: false})
        ok = ok.then(function() {
          ch.prefetch(1)
          return ch.consume(queue, reply)
        })
        return ok.then(function() {
          console.log(' [x] Awaiting RPC requests')
        })

        function reply(msg) {
          console.log(msg.content.toString())
          var response = '{ "foo" : "bar" }' //TODO make actual api calls
          ch.sendToQueue(msg.properties.replyTo,
            Buffer.from(response.toString()),
            {correlationId: msg.properties.correlationId})
          ch.ack(msg)
        }
      })
    })
  }

  createTask(taskinfo) {
    if(config.noIntegrations) { return new Promise(function(resolve) {resolve('{ "foo" : "bar" }')})}

    return rabbit.connect(config.rabbitHost).then(function(conn) {
      return conn.createChannel().then(function(ch) {
        return new Promise(function(resolve) {
          var corrId = new Uuid().create()

          function maybeAnswer(msg) {
            if (msg.properties.correlationId === corrId) {
              resolve(msg.content.toString())
            }
          }

          var ok = ch.assertQueue('', {exclusive: true})
            .then(function(qok) { return qok.queue })

          ok = ok.then(function(queue) {
            return ch.consume(queue, maybeAnswer, {noAck: true})
              .then(function() { return queue })
          })

          ok = ok.then(function(queue) {
            ch.sendToQueue('api_queue', Buffer.from(taskinfo.toString()), {
              correlationId: corrId, replyTo: queue
            })
          })
        })
      })
    }).catch(console.warn)
  }
}
export default Rabbit