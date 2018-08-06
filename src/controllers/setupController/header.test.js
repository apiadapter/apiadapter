import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import config from 'config'
import Server from '../../server'
import Apikey from '../../tools/apikey'
import Header from '../../dal/entities/headers/headerModel'
import Database from '../../db'

chai.use(chaiHttp)

//Server with token authorize
config.useAuth = true
let server = new Server(config).test()

var runIntegrationTests = (process.env.INTEGRATION_TESTS == 'true')
var apikey = new Apikey()

if(runIntegrationTests) { 
  describe('SetupController', () =>  { 
    describe('Header', () =>  { 
      it('Should Get successfully', (done) => {
        var item = new Header({
          'enabled': false,
          'name': 'foo',
          'key': 'key',
          'value': 'value',
          'updated': new Date()
        })
        item.save((err, item) => {
          chai.request(server)
            .get('/setup/123456789023/header/' + item._id)
            .set('X-API-KEY', apikey.readToken())
            .end((err, res) => {
              expect(res).to.have.status(200)
              done()
            })
        })
      }),
      it('Should delete successfully', (done) => {
        var item = new Header({
          'enabled': false,
          'name': 'foo',
          'key': 'key',
          'value': 'value',
          'updated': new Date()
        })
        item.save((err, item) => {
          chai.request(server)
            .delete('/setup/123456789023/header/' + item._id)
            .set('X-API-KEY', apikey.readToken())
            .end((err, res) => {
              expect(res).to.have.status(202)
              done()
            })
        })
      }),
      it('Should Post successfully', (done) => {
        chai.request(server)
          .post('/setup/123456789023/header')
          .set('X-API-KEY', apikey.readToken())
          .set('Content-Type', 'application/json')
          .send({
            'enabled': false,
            'name': 'foo',
            'key': 'key',
            'value': 'value',
            'updated': new Date()
          })
          .end((err, res) => {
            expect(res).to.have.status(201)
            done()
          })
      }),
      it('Should Update successfully', (done) => {
        var item = new Header({
          'enabled': false,
          'name': 'foo',
          'key': 'key',
          'value': 'value',
          'updated': new Date()
        })
        item.save((err, item) => {
          item.name = 'newname'
          chai.request(server)
            .put('/setup/123456789023/header/' + item._id)
            .set('X-API-KEY', apikey.readToken())
            .set('Content-Type', 'application/json')
            .send(item)
            .end((err, res) => {
              expect(res).to.have.status(200)
              done()
            })
        })
      })
    })
  })
}