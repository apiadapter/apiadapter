import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import config from 'config'
import mongoose from 'mongoose'
import Server from '../../server'
import KeyGenerator from '../../tools/apikey'
import ApiMapping from '../../dal/entities/apiMapping/apiMappingModel'
import Database from '../../db'

const ObjectId = mongoose.Types.ObjectId

chai.use(chaiHttp)

//Server with token authorize
config.useAuth = true
let server = new Server(config).test()

var runIntegrationTests = (process.env.INTEGRATION_TESTS == 'true')
var apikey = new KeyGenerator()

if(runIntegrationTests) { 
  describe('SetupController', () =>  { 
    describe('ApiMapping', () =>  { 
      it('Should Get successfully', (done) => {
        var item = new ApiMapping({
          'enabled': false,
          'schemaName': 'test',
          'toSchemaName': 'test',
          'toField': 'foo',
          'fromField': 'foo'
        })
        item.save((err, item) => {
          chai.request(server)
            .get('/setup/123456789023/apimapping/' + item._id)
            .set('X-API-KEY', apikey.readToken())
            .end((err, res) => {
              expect(res).to.have.status(200)
              done()
            })
        })
      }),
      it('Should delete successfully', (done) => {
        var item = new ApiMapping({
          'enabled': false,
          'schemaName': 'test',
          'toSchemaName': 'test',
          'toField': 'foo',
          'fromField': 'foo'
        })
        item.save((err, item) => {
          chai.request(server)
            .delete('/setup/123456789023/apimapping/' + item._id)
            .set('X-API-KEY', apikey.readToken())
            .end((err, res) => {
              expect(res).to.have.status(202)
              done()
            })
        })
      }),
      it('Should Post successfully', (done) => {
        chai.request(server)
          .post('/setup/123456789023/apimapping')
          .set('X-API-KEY', apikey.readToken())
          .set('Content-Type', 'application/json')
          .send({
            'enabled': false,
            'schemaName': 'test',
            'toSchemaName': 'test',
            'toField': 'foo',
            'fromField': 'foo'
          })
          .end((err, res) => {
            expect(res).to.have.status(201)
            done()
          })
      }),
      it('Should Update successfully', (done) => {
        var item = new ApiMapping({
          'enabled': false,
          'schemaName': 'test',
          'toSchemaName': 'test',
          'toField': 'foo',
          'fromField': 'foo'
        })
        item.save((err, item) => {
          item.schemaName = 'newSchema'
          chai.request(server)
            .put('/setup/123456789023/apimapping/' + item._id)
            .set('X-API-KEY', apikey.readToken())
            .set('Content-Type', 'application/json')
            .send(item)
            .end((err, res) => {
              expect(res.body.schemaName).to.equal('newSchema')
              expect(res).to.have.status(200)
              done()
            })
        })
      })
    })
  })
}