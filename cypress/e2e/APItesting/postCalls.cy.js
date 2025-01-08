describe('Api testing', () => {
    
    it('Approach 1 - Hardcoded json object', () => {
        const requestBody={
            title: "test post",
            body: "this is a post test",
            userID: 2
        }
        cy.request({
            method: "POST",
            url: "https://jsonplaceholder.typicode.com/posts",
            body: requestBody
        })
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.title).to.eq('test post')
            expect(response.body).to.have.property('title')
            expect(response.body.body).to.eq('this is a post test')
        })
    })

    it('Approach 2 - Dynamically generated json object', () => {
        const requestBody= {
            title: Math.random().toString(5).substring(2),  //ovo pravi random string
            body: Math.random().toString(5).substring(2)+"gmail.com",
        }

        cy.request({
            method: "POST",
            url: "https://jsonplaceholder.typicode.com/posts",
            body: requestBody
        })
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.title).to.eq(requestBody.title)
            expect(response.body.body).to.eq(requestBody.body)
        })
    })


    it.only('Approach 3 - Using fixtures', () => {

        cy.fixture('bodyTitle').then((data) => {                     //request mora da bude u cy.fixture, ne mozes da zatvoris fixture
            const requestBody= data                                 //dok god ne posaljes req i dobijes response

            cy.request({
                method: "POST",
                url: "https://jsonplaceholder.typicode.com/posts",
                body: requestBody
            })
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body.title).to.eq(requestBody.title)
                expect(response.body.body).to.eq(requestBody.body)
            })
        })
    })
})