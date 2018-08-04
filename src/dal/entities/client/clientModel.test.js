import {expect} from 'chai'
import config from 'config'
import Database from '../../../db'
import Client from './clientModel'

var runIntegrationTests = (process.env.INTEGRATION_TESTS == 'true')

if(runIntegrationTests) { 
  new Database().connect()
}

describe('Database models', (done) => {
  describe('Client', () => {
    it('Should faild with invalid client', (done) => {
      var invalid = new Client()
      invalid.validate((err) => {
        expect(err.errors.enabled).to.exist
        expect(err.errors.name).to.exist
        done()
      })
    }) 
    it('Should be valid', (done) => {
      var valid = new Client({enabled: true, name: 'test'})
      valid.validate((err) => {
        expect(err).to.not.exist
        done()
      })
    })
    if(runIntegrationTests) {
      it('Should save successfully', (done) => {
        var item = new Client({enabled: true, name: 'test'})
        item.save(function(err, item) {
          expect(err).to.not.exist
          expect(item).to.exist
          Client.collection.drop((err) => {
            done()
          })
        })
      })
      it('Should throw a validation error on save', (done) => {
        var item = new Client()
        item.save(function(err, item) {
          expect(err.errors.enabled).to.exist
          expect(err.errors.name).to.exist
          done()
        })
      })
    }
  })
})