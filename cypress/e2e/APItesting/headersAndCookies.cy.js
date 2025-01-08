describe('Login and API', () => {

    let authToken = null

    before("creating access token", () => {
        cy.request({
            method: "POST",
            url: "https://simple-books-api.glitch.me/api-clients/",
            headers: {
                'Content-Type': 'application/json'              //uglavnom se koristi ovo
            },                                          
            body: {
                clientName: "test2",
                clientEmail: Math.random().toString(5).substring(2)+"@gmail.com"    //ovo generise random mejl
            }
        })
        .then((response) => {
            authToken = response.body.accessToken
        })
    })

    before("creating new order", () => {            //pretvoris ovo u it kad zelis proveru
        cy.request({
            method: "POST",
            url: "https://simple-books-api.glitch.me/orders/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +authToken
            },                                          
            body: {
                bookId: 1,
                cusotmerName: "Isaac"
            }
        })
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.created).to.eq(true)
        })
    })

    it('Get all orders', () => {

        cy.request({
            method: "GET",
            url: "https://simple-books-api.glitch.me/orders/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +authToken
            },
            cookies: {
                'cookieName': 'myCookie'
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
            expect(response.body).to.have.length(1)
        })
    })

})