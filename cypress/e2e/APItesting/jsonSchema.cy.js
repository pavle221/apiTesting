// install ajv library
// npm install ajv

const ajv = require('ajv')
const avj = new ajv()

describe('JSON Schema validation testing', () => {

    it('Schema validation', () => {
        cy.request({
            method: "GET",
            url: "https://fakestoreapi.com/products"
        })
        .then((response) => {

            const schema = {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "title": "Generated schema for Root",
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "number"
                    },
                    "title": {
                      "type": "string"
                    },
                    "price": {
                      "type": "number"
                    },
                    "description": {
                      "type": "string"
                    },
                    "category": {
                      "type": "string"
                    },
                    "image": {
                      "type": "string"
                    },
                    "rating": {
                      "type": "object",
                      "properties": {
                        "rate": {
                          "type": "number"
                        },
                        "count": {
                          "type": "number"
                        }
                      },
                      "required": [
                        "rate",
                        "count"
                      ]
                    }
                  },
                  "required": [
                    "id",
                    "title",
                    "price",
                    "description",
                    "category",
                    "image",
                    "rating"
                  ]
                }
              } // schema end
              
              const validate = avj.compile(schema) //this command checks if the response is according to the schema but not validate
              const isValid = validate(response.body)  //validate(response.body) zapravo validira da li je schema kako treba
              expect(isValid).to.be.true  //ako je schema dobra treba da bude true, i onda samo u varijablu dodas expect to be true

        })
    })

})