import mongoose from 'mongoose'
import config from 'config'
import Apitype from '../src/dal/entities/apitype/apitypeModel'

export async function up (done) {
  var array = [{name: 'Resftul Service'},
    {name: 'Soap Service'},
    {name: 'WCF Service'},
    {name: 'RSS Feed'},
    {name: 'Atom Feed'}]
  await mongoose.connect(config.connectionstring, function(err) {
    if(err) throw err
    Apitype.collection.insert(array, function(err) {
      done()
    })
  })
}

export async function down (done) {
  await mongoose.connect(config.connectionstring, function(err) {
    if(err) throw err
    Apitype.collection.drop(function() {
      done()
    })
  })
}
