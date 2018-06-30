import {expect} from 'chai'
import config from 'config'
import Database from '../../../db'
import Apitype from './apitypeModel'

var runIntegrationTests = (process.env.INTEGRATION_TESTS == 'true')

if(runIntegrationTests) { 
  new Database().connect()
}

describe('Apitype', () => {
  it('Should faild with invalid apitype', (done) => {
    var invalid = new Apitype()
    invalid.validate((err) => {
      expect(err.errors.name).to.exist
      done()
    })
  }) 
  it('Should be valid', (done) => {
    var valid = new Apitype({name: 'test'})
    valid.validate((err) => {
      expect(err).to.not.exist
      done()
    })
  })
  if(runIntegrationTests) {
    it('Should save successfully', (done) => {
      var item = new Apitype({name: 'test'})
      item.save(function(err, item) {
        expect(err).to.not.exist
        expect(item).to.exist
        Apitype.collection.drop((err) => {
          done()
        })
      })
    })
    it('Should throw a validation error', (done) => {
      var item = new Apitype({name: ''})
      item.save(function(err, item) {
        expect(err.errors.name).to.exist
        done()
      })
    })
  }
})