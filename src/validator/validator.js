import {Validator} from 'jsonschema'

class QueryValidator {
  constructor(query, schema) {
    if(!query || !schema) {
      throw 'Query or schema missing!'
    }
    this.query = query
    this.schema = schema
  }

  validate() {
    return new Validator().validate(this.query, this.schema)
  }
}

export default QueryValidator