import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import Server from '../../server'
import settings from '../../../config/settings.json'

chai.use(chaiHttp)
let server = new Server(settings).test()

describe('SchemaController', () => {
  describe('.get', () => {
    it('Should return 500 for invalid parameter', function (done) {
      chai.request(server)
        .get('/schema/person.js')
        .end((err, res) => {
          expect(res).to.have.status(500)
          done()
        })
    })
    it('Should return 404 for resource not found', function (done) {
      chai.request(server)
        .get('/schema/notfound.json')
        .end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
    })
    it('Should return 200 for valid parameter', function (done) {
      chai.request(server)
        .get('/schema/person.json')
        .end((err, res) => {
          expect(res).to.have.status(200)
          done()
        })
    })
  })
})