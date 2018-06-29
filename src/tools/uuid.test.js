import {expect} from 'chai'
import Uuid from './uuid'

describe('Uuid', () => {
  describe('.create()', () => {
    it('Should return a Uuid', function() {
      var uuid = new Uuid().create()
      expect(uuid).to.have.match(/^0.\d+.\d+.\d+$/)
    })
  })
})