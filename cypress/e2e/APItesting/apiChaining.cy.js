describe('API Chaining', () => {

    it('Getting all of the posts', () => {

        cy.request({
            method: 'GET',
            url: 'http://jsonplaceholder.typicode.com/posts'
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            //expect(response.body[0].userId).to.eq(1)
            const postId = response.body[0].userId
            return postId
        })
        .then((postId) => {
            cy.request({
                method: "GET",
                url: `https://jsonplaceholder.typicode.com/comments?postId=${postId}`, //ako zelis da variable koristis u url kao qs
                // qs: {
                //     postId: 1
                // }
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.length(5)
            })
        })

    })

})