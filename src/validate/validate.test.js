import {expect} from 'chai'
import Validate from './validate.js'

it('Should return a validation error', function(done) {
  var instance = 'test'
  var schema = {'type': 'number'}
  var result = new Validate().query(instance, schema)
  expect(result.errors).to.have.lengthOf(1)
  expect(result.errors[0].message).to.equal('is not of a type(s) number')
  done()
})

it('Should return a ok status', function(done) {
  var instance = 4
  var schema = {'type': 'number'}
  var result = new Validate().query(instance, schema)
  expect(result.valid).to.equal(true)
  done()
})