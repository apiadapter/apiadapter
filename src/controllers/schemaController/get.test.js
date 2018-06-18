import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import config from 'config'
import Server from '../../server'
import Apikey from '../../tools/apikey'

chai.use(chaiHttp)

//Server without authorize
config.useAuth = false
let server = new Server(config).test()

//Server with token authorize
config.useAuth = true
let authserver = new Server(config).test()

describe('SchemaController', () => {
  describe('.get', () => {
    it('Should return 400 for invalid parameter', function () {
      chai.request(server)
        .get('/schema/person.js')
        .end((err, res) => {
          expect(res).to.have.status(400)
          server.close()
        })

    })
    it('Should return 404 for resource not found', function () {
      chai.request(server)
        .get('/schema/notfound.json')
        .end((err, res) => {
          expect(res).to.have.status(404)
          server.close()
        })
    })
    it('Should return 200 for valid parameter', function () {
      chai.request(server)
        .get('/schema/person.json')
        .end((err, res) => {
          expect(res).to.have.status(200)
          server.close()
        })
    })
    it('Should return 401 without token using authorization', function () {
      chai.request(authserver)
        .get('/schema/person.json')
        .end((err, res) => {
          expect(res).to.have.status(401)
          server.close()
        })
    })
    it('Should return 200 with token using authorization', function () {
      let apikey = new Apikey()
      chai.request(authserver)
        .get('/schema/person.json')
        .set('X-API-KEY', apikey.readToken())
        .end((err, res) => {
          expect(res).to.have.status(200)
          server.close()
        })
    })
  })
})