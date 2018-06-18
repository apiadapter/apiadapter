import {validate} from 'jsonschema'

class Validate {
  query(query, schema) {
    if(!query || !schema) {
      return false
    }
    var result = validate(query, schema)
    if(result.valid) {
      return true
    }
    return false
  }
}

export default Validate