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
    describe('User authentication', () =>  { 
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
            userConfirmed: true,
            email: 'test22@bar.com',
            updated: new Date()
          })
          .end((err, res) => {
            chai.request(server)
              .post('/setup/authenticate')
              .set('X-API-KEY', apikey.readToken())
              .set('Content-Type', 'application/json')
              .send({
                email: 'test22@bar.com',
                password: '1234578'
              })
              .end((error,response) => {
                expect(response).to.have.status(200)
                done()
              })
          })
      }),
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
            userConfirmed: false,
            email: 'test23@bar.com',
            updated: new Date()
          })
          .end((err, res) => {
            chai.request(server)
              .post('/setup/authenticate')
              .set('X-API-KEY', apikey.readToken())
              .set('Content-Type', 'application/json')
              .send({
                email: 'test23@bar.com',
                password: '12345789'
              })
              .end((error,response) => {
                expect(response.body.message).to.equal('Wrong email or password')
                expect(response).to.have.status(403)
                done()
              })
          })
      }),
      it('Should not authenticate unconfirmed user', (done) => {
        chai.request(server)
          .post('/setup/user')
          .set('X-API-KEY', apikey.readToken())
          .set('Content-Type', 'application/json')
          .send({
            enabled: true, 
            firstName: 'test', 
            lastName: 'person', 
            password: '1234578',
            email: 'test24@bar.com',
            updated: new Date()
          })
          .end((err, res) => {
            chai.request(server)
              .post('/setup/authenticate')
              .set('X-API-KEY', apikey.readToken())
              .set('Content-Type', 'application/json')
              .send({
                email: 'test24@bar.com',
                password: '1234578'
              })
              .end((error,response) => {
                expect(response.body.message).to.equal('email not confirmed!')
                expect(response).to.have.status(403)
                done()
              })
          })
      })
    })
  })
}