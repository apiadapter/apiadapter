import {expect} from 'chai'
import config from 'config'
import Database from '../../../db'
import Apikey from './apikeyModel'

var runIntegrationTests = (process.env.INTEGRATION_TESTS == 'true')

if(runIntegrationTests) { 
  new Database().connect()
}

describe('Apikey', () => {
  it('Should faild with invalid apikey', (done) => {
    var invalid = new Apikey()
    invalid.validate((err) => {
      expect(err.errors.enabled).to.exist
      expect(err.errors.key).to.exist
      done()
    })
  }) 
  it('Should be valid', (done) => {
    var valid = new Apikey({enabled: true, key: 'test'})
    valid.validate((err) => {
      expect(err).to.not.exist
      done()
    })
  })
  if(runIntegrationTests) {
    it('Should save successfully', (done) => {
      var item = new Apikey({enabled: true, key: 'test'})
      item.save(function(err, item) {
        expect(err).to.not.exist
        expect(item).to.exist
        Apikey.collection.drop((err) => {
          done()
        })
      })
    })
    it('Should throw a validation error on save', (done) => {
      var item = new Apikey()
      item.save(function(err, item) {
        expect(err.errors.enabled).to.exist
        expect(err.errors.key).to.exist
        done()
      })
    })
  }
})