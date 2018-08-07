import rabbit from 'amqplib'
import config from 'config'
import Promise from 'bluebird'
import Uuid from './tools/uuid'
import EmailHandler from './email/emailHandler'

class Rabbit {
  constructor () {
    this.queue = 'api_queue'
    this.emailQueue = 'email_queue'
    this.connection = null
  }

  emailConsumer() {
    var queue = this.emailQueue
    rabbit.connect(config.rabbitHost).then(function(conn) {
      conn.createChannel().then(function(ch) { 
        ch.assertQueue(queue, {durable: false})
        console.log(' [*] Waiting for email messages in %s.', queue)
        ch.consume(queue, function(msg) {
          const body = JSON.parse(msg.content.toString())
          const handler = new EmailHandler(body.template, {
            firstName: body.user.firstName,
            lastName: body.user.lastName,
            email: body.user.email
          },{
            resetLink: body.data.resetLink,
            verificationLink: body.data.verificationLink
          }, () => {console.log('mail sent')}, (error) => {console.log(error)})
          
          switch(body.template) {
            case 'resetPassword':
              handler.sendEmailResetLink()
              break
            case 'newUser': 
              handler.sendNewUserGreet()
              break
          }
        }, {noAck: true})
      })
    })
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
          var response = '{ "foo" : "bar" }' //TODO make actual api calls
          ch.sendToQueue(msg.properties.replyTo,
            Buffer.from(response.toString()),
            {correlationId: msg.properties.correlationId})
          ch.ack(msg)
        }
      })
    })
  }

  createEmail(emailInfo) {
    var queue = this.emailQueue
    return rabbit.connect(config.rabbitHost).then(function(conn) {
      return conn.createChannel().then(function(ch) {
        ch.assertQueue(queue, {durable: false})
        ch.sendToQueue(queue, Buffer.from(JSON.stringify(emailInfo)))
      })
    })
  }

  createTask(taskinfo) {
    return rabbit.connect(config.rabbitHost).then(function(conn) {
      return conn.createChannel().then(function(ch) {
        return new Promise(function(resolve) {
          var corrId = new Uuid().create()

          function maybeAnswer(msg) {
            if (msg.properties.correlationId === corrId) {
              resolve(msg.content.toString())
              setTimeout(function() { conn.close()}, 500)
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
    }).catch(function(err) { console.log(err)})
  }
}
export default Rabbit