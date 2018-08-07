import {expect} from 'chai'
import EmailHandler from './emailHandler.js'

describe('Email', () => {
  describe('Password reset', () => {
    it('Should send resetation email', (done) => {
      const handler = new EmailHandler('resetPassword', {
        firstName: 'Test',
        lastName: 'Person',
        email: 'abcdefg@abcdefg.com'
      },{
        resetLink: '12345'
      }, (mail) => {
        expect(mail).to.exist
        done()
      }, (error) => {
        expect(error).to.not.exist
        done()
      })
      handler.sendEmailResetLink()
    }).timeout(10000)
  })

  describe('new User Greet', () => {
    it('Should send resetation email', (done) => {
      const handler = new EmailHandler('newUser', {
        firstName: 'Test',
        lastName: 'Person',
        email: 'abcd@abcdefg.com'
      },{
        verificationLink: '12345'
      }, (mail) => {
        expect(mail).to.exist
        done()
      }, (error) => {
        expect(error).to.not.exist
        done()
      })
      handler.sendNewUserGreet()
    }).timeout(10000)
  })
})


