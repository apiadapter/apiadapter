import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import config from 'config'
import mongoose from 'mongoose'
import Server from '../../server'
import KeyGenerator from '../../tools/apikey'
import Apikey from '../../dal/entities/apikey/apikeyModel'
import Database from '../../db'

const ObjectId = mongoose.Types.ObjectId

chai.use(chaiHttp)

//Server with token authorize
config.useAuth = true
let server = new Server(config).test()

var runIntegrationTests = (process.env.INTEGRATION_TESTS == 'true')
var apikey = new KeyGenerator()

if(runIntegrationTests) { 
  describe('ApikeyController', () =>  { 
    it('Should Get successfully', (done) => {
      var item = new Apikey({
        'enabled': false,
        'client': ObjectId('123456789012'),
        'key': 'foobar',
        'updated': new Date()
      })
      item.save((err, item) => {
        chai.request(server)
          .get('/setup/123456789023/apikey/' + item._id)
          .set('X-API-KEY', apikey.readToken())
          .end((err, res) => {
            expect(res).to.have.status(200)
            done()
          })
      })
    }),
    it('Should delete successfully', (done) => {
      var item = new Apikey({
        'enabled': false,
        'client': ObjectId('123456789012'),
        'key': 'foobar',
        'updated': new Date()
      })
      item.save((err, item) => {
        chai.request(server)
          .delete('/setup/123456789023/apikey/' + item._id)
          .set('X-API-KEY', apikey.readToken())
          .end((err, res) => {
            expect(res).to.have.status(202)
            done()
          })
      })
    }),
    it('Should Post successfully', (done) => {
      chai.request(server)
        .post('/setup/123456789023/apikey')
        .set('X-API-KEY', apikey.readToken())
        .set('Content-Type', 'application/json')
        .send({
          'enabled': false,
          'client': ObjectId('123456789012'),
          'key': 'foobar',
          'updated': new Date()
        })
        .end((err, res) => {
          expect(res).to.have.status(201)
          done()
        })
    }),
    it('Should Update successfully', (done) => {
      var item = new Apikey({
        'enabled': false,
        'client': ObjectId('123456789012'),
        'key': 'foobar',
        'updated': new Date()
      })
      item.save((err, item) => {
        item.key = 'newkey'
        chai.request(server)
          .put('/setup/123456789023/apikey/' + item._id)
          .set('X-API-KEY', apikey.readToken())
          .set('Content-Type', 'application/json')
          .send(item)
          .end((err, res) => {
            expect(res.body.key).to.equal('newkey')
            expect(res).to.have.status(200)
            done()
          })
      })
    })
  })
}