import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import config from 'config'
import Server from '../../server'
import Apikey from '../../tools/apikey'
import Api from '../../dal/entities/api/apiModel'
import Database from '../../db'

chai.use(chaiHttp)

//Server with token authorize
config.useAuth = true
let server = new Server(config).test()

var runIntegrationTests = (process.env.INTEGRATION_TESTS == 'true')
var apikey = new Apikey()

if(runIntegrationTests) { 
  describe('ApiController', () =>  { 
    describe('apiPost', () =>  {
      it('Should not save invalid Api', () => {
        chai.request(server)
          .post('/setup')
          .set('X-API-KEY', apikey.readToken())
          .set('Content-Type', 'application/json')
          .send({'foo': 'bar'})
          .end((err, res) => {
            expect(res).to.have.status(500)
            server.close()
          })
      }),
      it('Should delete successfully', () => {
        var item = new Api({
          'enabled': false,
          'name': 'abc',
          'address': 'abc',
          'port': 123,
          'requireHeaders': false
        })
        item.save((err, item) => {
          chai.request(server)
            .delete('/setup/' + item._id)
            .set('X-API-KEY', apikey.readToken())
            .end((err, res) => {
              expect(res).to.have.status(202)
            })
        })
      }),
      it('Should Get successfully', () => {
        var item = new Api({
          'enabled': false,
          'name': 'foo123',
          'address': 'bar123',
          'port': 12345,
          'requireHeaders': false
        })
        item.save((err, item) => {
          chai.request(server)
            .get('/setup/' + item._id)
            .set('X-API-KEY', apikey.readToken())
            .end((err, res) => {
              expect(res).to.have.status(200)
            })
        })
      }),
      it('Should Update successfully', () => {
        var item = new Api({
          'enabled': false,
          'name': 'foo123',
          'address': 'bar123',
          'port': 12345,
          'requireHeaders': false
        })
        item.save((err, item) => {
          chai.request(server)
            .put('/setup/' + item._id)
            .set('X-API-KEY', apikey.readToken())
            .set('Content-Type', 'application/json')
            .send({
              'enabled': false,
              'name': 'newname',
              'address': 'bar',
              'port': 12345,
              'requireHeaders': false
            })
            .end((err, res) => {
              expect(res).to.have.status(200)
            })
        })
      }),
      it('Should Save successfully', () => {
        chai.request(server)
          .post('/setup')
          .set('X-API-KEY', apikey.readToken())
          .set('Content-Type', 'application/json')
          .send({
            'enabled': false,
            'name': 'foobar',
            'address': 'bar',
            'port': 12345,
            'requireHeaders': false
          })
          .end((err, res) => {
            var item = res.body
            expect(item.name).to.equal('foobar')
            expect(res).to.have.status(201)
          })
      })
    })
  })
}
