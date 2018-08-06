import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import config from 'config'
import Server from '../../server'
import Apikey from '../../tools/apikey'
import User from '../../dal/entities/user/userModel'
import Database from '../../db'

chai.use(chaiHttp)

//Server with token authorize
config.useAuth = true
let server = new Server(config).test()

var runIntegrationTests = (process.env.INTEGRATION_TESTS == 'true')
var apikey = new Apikey()

if(runIntegrationTests) { 
  describe('SetupController', () =>  { 
    describe('User', () =>  { 
      it('Should Get successfully', (done) => {
        var item = new User({
          enabled: true, 
          firstName: 'test', 
          lastName: 'person', 
          password: '1234578',
          salt: 'abcdefg',
          email: 'test@bar.com',
          updated: new Date()
        })
        item.save((err, item) => {
          chai.request(server)
            .get('/setup/user/' + item._id)
            .set('X-API-KEY', apikey.readToken())
            .end((err, res) => {
              expect(res).to.have.status(200)
              done()
            })
        })
      }),
      it('Should delete successfully', (done) => {
        var item = new User({
          enabled: true, 
          firstName: 'test', 
          lastName: 'person', 
          password: '1234578',
          salt: 'abcedfg',
          email: 'test1@bar.com',
          updated: new Date()
        })
        item.save((err, item) => {
          chai.request(server)
            .delete('/setup/user/' + item._id)
            .set('X-API-KEY', apikey.readToken())
            .end((err, res) => {
              expect(res).to.have.status(202)
              done()
            })
        })
      }),
      it('Should Post successfully', (done) => {
        chai.request(server)
          .post('/setup/user')
          .set('X-API-KEY', apikey.readToken())
          .set('Content-Type', 'application/json')
          .send({
            enabled: true, 
            firstName: 'test', 
            lastName: 'person', 
            password: '1234578',
            email: 'test2@bar.com',
            updated: new Date()
          })
          .end((err, res) => {
            expect(res.body.password).to.not.equal('12345678')
            expect(res).to.have.status(201)
            done()
          })
      }),
      it('Should Update successfully', (done) => {
        var item = new User({
          enabled: true, 
          firstName: 'test', 
          lastName: 'person', 
          password: '1234578',
          salt: 'abcdefg',
          email: 'test3@bar.com',
          updated: new Date()
        })
        item.save((err, item) => {
          item.firstName = 'newname'
          chai.request(server)
            .put('/setup/user/' + item._id)
            .set('X-API-KEY', apikey.readToken())
            .set('Content-Type', 'application/json')
            .send(item)
            .end((err, res) => {
              expect(res.body.firstName).to.equal('newname')
              expect(res).to.have.status(200)
              done()
            })
        })
      }),
      it('Should Authenticate user', (done) => {
        chai.request(server)
          .post('/setup/user')
          .set('X-API-KEY', apikey.readToken())
          .set('Content-Type', 'application/json')
          .send({
            enabled: true, 
            firstName: 'test', 
            lastName: 'person', 
            password: '1234578',
            email: 'test2@bar.com',
            updated: new Date()
          })
          .end((err, res) => {
            chai.request(server)
              .post('/setup/authenticate')
              .set('X-API-KEY', apikey.readToken())
              .set('Content-Type', 'application/json')
              .send({
                email: 'test2@bar.com',
                password: '1234578'
              })
              .end((error,response) => {
                expect(response).to.have.status(200)
                done()
              })
          })
      })
      it('Should not authenticate user', (done) => {
        chai.request(server)
          .post('/setup/user')
          .set('X-API-KEY', apikey.readToken())
          .set('Content-Type', 'application/json')
          .send({
            enabled: true, 
            firstName: 'test', 
            lastName: 'person', 
            password: '1234578',
            email: 'test2@bar.com',
            updated: new Date()
          })
          .end((err, res) => {
            chai.request(server)
              .post('/setup/authenticate')
              .set('X-API-KEY', apikey.readToken())
              .set('Content-Type', 'application/json')
              .send({
                email: 'test2@bar.com',
                password: '12345789'
              })
              .end((error,response) => {
                expect(response).to.have.status(403)
                done()
              })
          })
      })
    })
  })
}