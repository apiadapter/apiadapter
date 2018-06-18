import {Validator} from 'jsonschema'

class Validate {
  query(query, schema) {
    if(!query || !schema) {
      throw 'Query or schema missing!'
    }
    return new Validator().validate(this.query, this.schema)
  }
}

export default Validate