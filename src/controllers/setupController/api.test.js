import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import config from 'config'
import mongoose from 'mongoose'
import Server from '../../server'
import Apikey from '../../tools/apikey'
import Api from '../../dal/entities/api/apiModel'
import Client from '../../dal/entities/client/clientModel'
import Database from '../../db'

const ObjectId = mongoose.Types.ObjectId

chai.use(chaiHttp)

//Server with token authorize
config.useAuth = true
let server = new Server(config).test()

var runIntegrationTests = (process.env.INTEGRATION_TESTS == 'true')
var apikey = new Apikey()

if(runIntegrationTests) { 
  describe('ApiController', () =>  { 
    it('Should not save invalid Api', (done) => {
      chai.request(server)
        .post('/setup/123456789012/api')
        .set('X-API-KEY', apikey.readToken())
        .set('Content-Type', 'application/json')
        .send({'foo': 'bar'})
        .end((err, res) => {
          expect(res).to.have.status(500)
          server.close()
          done()
        })
    }),
    it('Should delete successfully', (done) => {
      var item = new Api({
        'enabled': false,
        'name': 'abc',
        'address': 'abc',
        'port': 123,
        'requireHeaders': false,
        'client' : ObjectId('123456789012')
      })
      item.save((err, item) => {
        chai.request(server)
          .delete('/setup/123456789012/api/' + item._id)
          .set('X-API-KEY', apikey.readToken())
          .end((err, res) => {
            expect(res).to.have.status(202)
            done()
          })
      })
    }),
    it('Should Get successfully', (done) => {
      var item = new Api({
        'enabled': false,
        'name': 'foo123',
        'address': 'bar123',
        'port': 12345,
        'requireHeaders': false,
        'client' : ObjectId('123456789012')
      })
      item.save((err, item) => {
        chai.request(server)
          .get('/setup/123456789012/api/' + item._id)
          .set('X-API-KEY', apikey.readToken())
          .end((err, res) => {
            expect(res).to.have.status(200)
            done()
          })
      })
    }),
    it('Should Update successfully', (done) => {
      var item = new Api({
        'enabled': false,
        'name': 'foo123',
        'address': 'bar123',
        'port': 12345,
        'requireHeaders': false,
        'client' : ObjectId('123456789012')
      })
      item.save((err, item) => {
        item.name = 'newname'
        chai.request(server)
          .put('/setup/123456789012/api/' + item._id)
          .set('X-API-KEY', apikey.readToken())
          .set('Content-Type', 'application/json')
          .send(item)
          .end((err, res) => {
            expect(res).to.have.status(200)
            done()
          })
      })
    }),
    it('Should Post successfully', (done) => {
      var client = new Client({
        'enabled': false,
        'name': 'foo123',
        'updated': new Date()
      })
      client.save((err, item) => {
        chai.request(server)
          .post('/setup/' + item._id + '/api')
          .set('X-API-KEY', apikey.readToken())
          .set('Content-Type', 'application/json')
          .send({
            'enabled': false,
            'name': 'foobar',
            'address': 'bar',
            'port': 12345,
            'requireHeaders': false,
            'client': item._id
          })
          .end((err, res) => {
            expect(res).to.have.status(201)
            done()
          })
      })
    })
  })
}
