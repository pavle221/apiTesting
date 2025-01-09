describe('Basic Auth', () => {

    it('basic auth testing', () => {
        cy.request({
            method: "GET",
            url: "https://postman-echo.com/basic-auth",
            auth: {
                user: 'postman',
                pass: 'password'
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)
        })
    })

    it('digest auth testing', () => {
        cy.request({
            method: "GET",
            url: "https://postman-echo.com/basic-auth",
            auth: {
                user: 'postman',
                pass: 'password',
                method: 'digest'                        //kod digesta autha moras da dodas method polje i da stavis digest
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)
        })
    })

    const token = Cypress.env('myBearerToken')
    it('Bearer token auth', () => {

        cy.request({
            method: "GET",
            url: "https://api.github.com/user/repos",
            headers: {
                Authorization: 'Bearer '+ token
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
            expect(response.body[0].name).to.eq('Assignment5')
        })

    })

    it('API key auth', () => {
        
        cy.request({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather", //ovde moze da bude i /weather?q=delhi a moze i odvojeno u qs
            qs: {
                q: 'Delhi',
                appid: "myApiKey"       //api key and value
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)

        })

    })

})