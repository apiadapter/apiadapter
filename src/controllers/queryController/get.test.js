import fs from 'fs'
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

let invalidQuery = fs.readFileSync(__dirname + '/../../../mocks/query_templates/invalid_query.json', {encoding: 'utf8'})
let validQuery = fs.readFileSync(__dirname + '/../../../mocks/query_templates/valid_query.json', {encoding: 'utf8'})

describe('QueryController', () => {
  describe('.get', () => {
    it('Should return 400 for invalid query', function () {
      chai.request(server)
        .get('/query/' + invalidQuery)
        .end((err, res) => {
          expect(res).to.have.status(400)
          server.close()
        })
    })
    it('Should return 200 with valid query', function () {
      chai.request(server)
        .get('/query/' + validQuery)
        .end((err, res) => {
          expect(res).to.have.status(200)
          server.close()
        })
    })
    it('Should return 401 without token using authorization', function () {
      chai.request(authserver)
        .get('/query/' + validQuery)
        .end((err, res) => {
          expect(res).to.have.status(401)
          server.close()
        })
    })
    it('Should return 200 with token using authorization', function () {
      let apikey = new Apikey()
      chai.request(authserver)
        .get('/query/' + validQuery)
        .set('X-API-KEY', apikey.readToken())
        .end((err, res) => {
          expect(res).to.have.status(200)
          server.close()
        })
    })
  })
})