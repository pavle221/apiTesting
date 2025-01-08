// install xml2js library
//npm install xml2js

const xml2js = require('xml2js')
const parser = new xml2js.Parser({explicitArray: false})   //ovo radis na pocetku UVEK

describe('XML Parsing', () => {

    const xmlPayload = "<Pet>     <id>0</id>     <Category>         <id>0</id>         <name>Dog</name>     </Category>     <name>Jimmy</name>     <photoUrls>         <photoUrl>string</photoUrl>     </photoUrls>     <tags>         <Tag>             <id>0</id>             <name>string</name>         </Tag>     </tags>     <status>available</status> </Pet>"
    let petId = null

    before('creating Pet', () => {

        cy.request({
            method: "POST",
            url: "https://petstore.swagger.io/v2/pet",
            body: xmlPayload,
            headers: {
                'Content-Type': "application/xml",
                'accept': 'application/xml'
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            parser.parseString(response.body,(err, result) => {         //parseString pretvara xml u js objekat, da bi procitao content
                petId = result.Pet.id
            })
        })
    })


    it('Getting pet data - parsing xml response', () => {

        cy.request({
            method: "GET",
            url: "https://petstore.swagger.io/v2/pet/"+petId,
            headers: {
                'accept': 'application/xml'
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            parser.parseString(response.body,(err, result) => {         //parseString pretvara xml u js objekat, da bi procitao content
                expect(result.Pet.name).to.eq('Jimmy')
                expect(result.Pet.id).to.eq(petId)
                expect(result.Pet.status).to.equal('available')
            })
        })
    })

})