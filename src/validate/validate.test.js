import {expect} from 'chai'
import Validate from './validate.js'

describe('Validate', function() {
  describe('.query', function() {
    it('Should return a validation error', function() {
      var instance = 'test'
      var schema = {'type': 'number'}
      var result = new Validate().query(instance, schema)
      expect(result.errors).to.have.lengthOf(1)
      expect(result.errors[0].message).to.equal('is not of a type(s) number')
    })

    it('Should be valid', function() {
      var instance = 4
      var schema = {'type': 'number'}
      var result = new Validate().query(instance, schema)
      expect(result.valid).to.equal(true)
    })
  })
})
