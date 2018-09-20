import {expect} from 'chai'
import config from 'config'
import Database from '../../../db'
import ApiMapping from './apiMappingModel'

var runIntegrationTests = (process.env.INTEGRATION_TESTS == 'true')

if(runIntegrationTests) { 
  new Database().connect()
}

describe('Database models', (done) => {
  describe('ApiMapping', () => {
    it('Should faild with invalid apiMapping', (done) => {
      var invalid = new ApiMapping()
      invalid.validate((err) => {
        expect(err.errors.enabled).to.exist
        expect(err.errors.schemaName).to.exist
        expect(err.errors.toSchemaName).to.exist
        expect(err.errors.fromField).to.exist
        expect(err.errors.toField).to.exist
        done()
      })
    }) 
    it('Should be valid', (done) => {
      var valid = new ApiMapping({enabled: true, schemaName: 'test', toSchemaName: 'test2', fromField: 'fromTest', toField: 'toTest'})
      valid.validate((err) => {
        expect(err).to.not.exist
        done()
      })
    })
    if(runIntegrationTests) {
      it('Should save successfully', (done) => {
        var item = new ApiMapping({enabled: true, schemaName: 'test',toSchemaName: 'test2', fromField: 'fromTest', toField: 'toTest'})
        item.save(function(err, item) {
          expect(err).to.not.exist
          expect(item).to.exist
          ApiMapping.collection.drop((err) => {
            done()
          })
        })
      })
      it('Should throw a validation error on save', (done) => {
        var item = new ApiMapping()
        item.save(function(err, item) {
          expect(err.errors.enabled).to.exist
          expect(err.errors.schemaName).to.exist
          expect(err.errors.toSchemaName).to.exist
          expect(err.errors.fromField).to.exist
          expect(err.errors.toField).to.exist
          done()
        })
      })
    }
  })
})