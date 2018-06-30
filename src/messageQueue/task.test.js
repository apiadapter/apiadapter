import fs from 'fs'
import {expect} from 'chai'
import config from 'config'
import Task from './task'

const validResult = fs.readFileSync(__dirname + '/../../mocks/response_templates/valid_result.json', {encoding: 'utf8'})
describe('Task', () => {
  describe('.create()', () => {
    if(config.noIntegrationTests) {
      it('Should return a mocked json', (done) => {
        var task = new Task().create('dummy').then(function(result) {
          expect(result).to.equal(validResult)
          done()
        })
      })
    }
  })
})