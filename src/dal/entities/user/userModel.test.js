import {expect} from 'chai'
import config from 'config'
import Database from '../../../db'
import User from './userModel'

var runIntegrationTests = (process.env.INTEGRATION_TESTS == 'true')

if(runIntegrationTests) { 
  new Database().connect()
}

describe('Database models', (done) => {
  describe('User', () => {
    it('Should faild with invalid user', (done) => {
      var invalid = new User()
      invalid.validate((err) => {
        expect(err.errors.enabled).to.exist
        expect(err.errors.firstName).to.exist
        expect(err.errors.lastName).to.exist
        expect(err.errors.password).to.exist
        expect(err.errors.email).to.exist
        done()
      })
    })
    it('Should faild with invalid password', (done) => {
      var invalid = new User({enabled: true, 
        firstName: 'test', 
        lastName: 'person', 
        password: '12345',
        salt: 'abcdefg',
        email: 'foo1@bar.com'
      })
      invalid.validate((err) => {
        expect(err.errors.password).to.exist
        done()
      })
    }) 
    it('Should be valid', (done) => {
      var valid = new User({enabled: true, 
        firstName: 'test', 
        lastName: 'person', 
        password: '1234567',
        salt: 'abcdefg',
        email: 'foo2@bar.com'
      })
      valid.validate((err) => {
        expect(err).to.not.exist
        done()
      })
    })
    if(runIntegrationTests) {
      it('Should save successfully', (done) => {
        var item = new User({enabled: true, 
          firstName: 'test', 
          lastName: 'person', 
          password: '1234567',
          salt: 'abcdefg',
          email: 'foo3@bar.com'
        })
        item.save(function(err, item) {
          expect(err).to.not.exist
          expect(item).to.exist
          User.collection.drop((err) => {
            done()
          })
        })
      })
      it('Should throw a validation error on save', (done) => {
        var item = new User()
        item.save(function(err, item) {
          expect(err.errors.enabled).to.exist
          expect(err.errors.firstName).to.exist
          expect(err.errors.lastName).to.exist
          expect(err.errors.password).to.exist
          done()
        })
      })
      it('Should throw a validation error on password length', (done) => {
        var item = new User({enabled: true, 
          firstName: 'test', 
          lastName: 'person', 
          password: '12345',
          salt: 'abcdefg',
          email: 'foo4@bar.com'
        })
        item.save(function(err, item) {
          expect(err.errors.password).to.exist
          done()
        })
      })
      it('Should throw a validation error on unique email', (done) => {
        var first = new User({enabled: true, 
          firstName: 'test', 
          lastName: 'person', 
          password: '1234578',
          salt: 'abcdefg',
          email: 'unique@bar.com'
        })
        first.save(function(err, item) {
          var second = new User({enabled: true, 
            firstName: 'secondTest', 
            lastName: 'person', 
            password: '1234578',
            salt: 'abcdefg',
            email: 'unique@bar.com'
          })
          second.save(function(error, item) {
            expect(error).to.exist
            User.collection.drop((err) => {
              done()
            })
          })
          
        })

        
      })
    }
  })
})