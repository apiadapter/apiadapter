import fs from 'fs'
import {expect} from 'chai'
import Rabbit from '../rabbit'
import Task from './task'

const validResult = fs.readFileSync(__dirname + '/../../mocks/response_templates/valid_result.json', {encoding: 'utf8'})
var runIntegrationTests = (process.env.INTEGRATION_TESTS == 'true')
describe('Task', () => {
  describe('.create()', () => {
    if(!runIntegrationTests) {
      it('Should return a mocked json', (done) => {
        var task = new Task().create('dummy').then(function(result) {
          expect(result).to.equal(validResult)
          done()
        })
      })
    } else {
      it('Should return a result from messageQueue', (done) => {
        var rabbit = new Rabbit()
        rabbit.consumer()
        var task = new Task().create('dummy').then(function(result) {
          expect(result).to.not.be.null
          expect(JSON.parse(result)).to.not.throw
          done()
        })
      })
    }
  })
})