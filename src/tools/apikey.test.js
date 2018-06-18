import fs from 'fs'
import {expect} from 'chai'
import Apikey from './apikey'

const apikey = new Apikey()

describe('Apikey', () => {
  describe('.create()', () => {
    it('Should return a SHA1 string', () => {
      var hash = apikey.create()
      expect(hash).to.not.be.null
      expect(hash).to.be.string
    })
  })
  describe('.validate()', () => {
    it('should return true when valid apikey', () => {
      var hash = apikey.create()
      expect(apikey.validate(hash)).to.equal(true)
    })
    it('should return false when invaid apikey', () => {
      var hash = 'abcdefg'
      expect(apikey.validate(hash)).to.equal(false)
    })
  })
  describe('.writeToken()', () => {
    it('should create APIKEY file to root', () => {
      fs.unlinkSync(__dirname + '/../../APIKEY')
      var hash = apikey.create()
      apikey.writeToken(hash)
      let exists = fs.existsSync(__dirname + '/../../APIKEY')
      expect(exists).to.equal(true)
      fs.unlinkSync(__dirname + '/../../APIKEY')
      exists = fs.existsSync(__dirname + '/../../APIKEY')
      expect(exists).to.equal(false)
    })
  })
  describe('.readToken()', () => {
    beforeEach(function() {
      let exists = fs.existsSync(__dirname + '/../../APIKEY')
      if(exists) {
        fs.unlinkSync(__dirname + '/../../APIKEY')
      }
    })
    afterEach(function() {
      fs.unlinkSync(__dirname + '/../../APIKEY')
      apikey.readToken()
    })
    it('should create APIKEY and return a hash', () => {
      var hash = apikey.readToken()
      expect(apikey.validate(hash)).to.equal(true)
      let exists = fs.existsSync(__dirname + '/../../APIKEY')
      expect(exists).to.equal(true)
    })
    it('should return existing APIKEY and return a hash', () => {
      var hash = apikey.readToken()
      expect(apikey.validate(hash)).to.equal(true)
      var newhash = apikey.readToken()
      expect(hash).to.equal(newhash)
    })
    it('should return an error from invalid APIKEY', () => {
      fs.writeFileSync(__dirname + '/../../APIKEY', 'ABCDE')
      expect(() => apikey.readToken()).to.throw('Invalid master apikey!, existing...')
    })
  })
})