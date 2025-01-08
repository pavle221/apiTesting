describe('Querry testing', () => {
    
    const queryParam={ page: 2}
    
    it('querry params', () => {
        cy.request({
            method: "GET",
            url: "http://reqres.in/api/users",          //ovde moze /api/users?page=2 ali koristimo ovo ispod, qs: {page:2}
            qs: {page:2} //moze i samo queryParam umesto {page=2}

        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.page).to.eq(2)
            expect(response.body.data).to.have.length(6)
            expect(response.body.data[1]).to.have.property('id', 8)
        })
    })
})