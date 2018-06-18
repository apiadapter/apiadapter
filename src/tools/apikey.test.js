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
})