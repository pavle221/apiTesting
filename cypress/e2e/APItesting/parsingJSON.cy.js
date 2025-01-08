describe('Parsing JSON', () => {

    it('Parsing JSON Response' , () => {

        cy.request({
            method: "GET",
            url: "https://fakestoreapi.com/products"
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body[0].id).to.eq(1)        //[0] pored response.body bira koji object po redu zelis
            expect(response.body[0].title).to.eq("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
            expect(response.body[0].rating.rate).to.eq(3.9)
        })
    })


    it('Parsing complex JSON response' , () => {
        let totalPrice=0

        cy.request({
            method: "GET",
            url: "https://fakestoreapi.com/products",
            qs: {limit:5}
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            response.body.forEach(item => {
                expect(item).to.have.property('price')
                totalPrice=totalPrice+item.price
            });
            expect(totalPrice).to.eq(899.23)   //ovo je za limit 5, ako imas vise onda nije 899
        })
    })

})