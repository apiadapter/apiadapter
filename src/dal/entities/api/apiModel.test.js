import {expect} from 'chai'
import config from 'config'
import mongoose from 'mongoose'
import Database from '../../../db'
import Client from '../client/clientModel'
import Api from './apiModel'

const ObjectId = mongoose.Types.ObjectId

var runIntegrationTests = (process.env.INTEGRATION_TESTS == 'true')

if(runIntegrationTests) { 
  new Database().connect()
}

describe('Database models', () => {
  describe('Api', () => {
    it('Should fail with invalid api', (done) => {
      var invalid = new Api()
      invalid.validate((err) => {
        expect(err.errors.enabled).to.exist
        expect(err.errors.name).to.exist
        expect(err.errors.address).to.exist
        expect(err.errors.port).to.exist
        expect(err.errors.client).to.exist
        expect(err.errors.requireHeaders).to.exist
        done()
      })
    }) 
    it('Should be valid', (done) => {
      var valid = new Api({enabled: true, name: 'test', address: 'foo', port: 1234, requireHeaders: false, client: ObjectId('123456789012')})
      valid.validate((err) => {
        expect(err).to.not.exist
        done()
      })
    })
    if(runIntegrationTests) {
      it('Should save successfully', (done) => {
        var client = new Client({
          'name': 'test',
          'enabled': true,
          'updated': new Date()
        })
        client.save(function(err, c) {
          var item = new Api({enabled: true, name: 'test', address: 'foo', port: 1234, requireHeaders: false, client: c._id})
          item.save(function(err, item) {
            expect(err).to.not.exist
            expect(item).to.exist
            Api.collection.drop((err) => {
            })
            done()
          })
        })
      })
      it('Should throw a validation error on save', (done) => {
        var item = new Api()
        item.save(function(err, item) {
          expect(err.errors.enabled).to.exist
          expect(err.errors.name).to.exist
          expect(err.errors.address).to.exist
          expect(err.errors.port).to.exist
          expect(err.errors.client).to.exist
          expect(err.errors.requireHeaders).to.exist
          done()
        })
      })
    }
  })
})