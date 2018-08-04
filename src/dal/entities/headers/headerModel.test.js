import {expect} from 'chai'
import config from 'config'
import Database from '../../../db'
import Header from './headerModel'

var runIntegrationTests = (process.env.INTEGRATION_TESTS == 'true')

if(runIntegrationTests) { 
  new Database().connect()
}

describe('Database models', (done) => {
  describe('Header', () => {
    it('Should faild with invalid header', (done) => {
      var invalid = new Header()
      invalid.validate((err) => {
        expect(err.errors.enabled).to.exist
        expect(err.errors.name).to.exist
        expect(err.errors.key).to.exist
        expect(err.errors.value).to.exist
        done()
      })
    }) 
    it('Should be valid', (done) => {
      var valid = new Header({enabled: true, name: 'test', key: 'foo', value: 'bar'})
      valid.validate((err) => {
        expect(err).to.not.exist
        done()
      })
    })
    if(runIntegrationTests) {
      it('Should save successfully', (done) => {
        var item = new Header({enabled: true, name: 'test', key: 'foo', value: 'bar'})
        item.save(function(err, item) {
          expect(err).to.not.exist
          expect(item).to.exist
          Header.collection.drop((err) => {
            done()
          })
        })
      })
      it('Should throw a validation error on save', (done) => {
        var item = new Header()
        item.save(function(err, item) {
          expect(err.errors.enabled).to.exist
          expect(err.errors.name).to.exist
          expect(err.errors.key).to.exist
          expect(err.errors.value).to.exist
          done()
        })
      })
    }
  })
})