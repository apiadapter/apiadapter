import {expect} from 'chai'
import Validate from './validate.js'

describe('Validate', function() {
  describe('.query', function() {
    it('Should return a validation error', function() {
      var instance = 'test'
      var schema = {'type': 'number'}
      var result = new Validate().query(instance, schema)
      expect(result).to.equal(false)
    })

    it('Should be valid', function() {
      var instance = 4
      var schema = {'type': 'number'}
      var result = new Validate().query(instance, schema)
      expect(result).to.equal(true)
    })
  })
})
