describe('HTTP tests', () => {


it("GET call", () => {

    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
    .its('status')
    .should('equal', 200)
})

it("POST call", () => {

    cy.request( {
                method: 'POST',
                url: 'https://jsonplaceholder.typicode.com/posts',
                body: {
                    title: "test post",
                    body: "this is a post test",
                    userID: 2
                }

    } )
    .its('status')
    .should('eq', 201)

})


it('PUT call', () => {

cy.request({
    method: "PUT",
    url: 'https://jsonplaceholder.typicode.com/posts/1',
    body: {
        title: "Put call",
        body: "This is a put call",
        userID: 1,
        id: 1
    }
})
.its('status').should('eq', 200)

})


it('DELETE call', () => {
    cy.request({
        method: 'DELETE',
        url: 'https://jsonplaceholder.typicode.com/posts/1'
    }).its('status').should('eq', 200)
})


})