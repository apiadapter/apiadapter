import {validate} from 'jsonschema'

class Validate {
  query(query, schema) {
    if(!query || !schema) {
      throw 'Query or schema missing!'
    }
    var result = validate(query, schema)
    return result
  }
}

export default Validate