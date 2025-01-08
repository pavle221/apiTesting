/*
    post https://gorest.co.in/public/v2/users
    get https://gorest.co.in/public/v2/posts
    put/patch https://gorest.co.in/public/v2/users/${userId}
    delete https://gorest.co.in/public/v2/users/${userId}
*/


describe('GoRest API Chaining', () => {
    const authToken = 'Bearer 310c5a4a2ba02cdda57908f5706ed3846da175f5e6ade781a377d8d707a656cf'

    it('Create update and delete a user', () => {

        cy.request({
            method: "POST",
            url: "https://gorest.co.in/public/v2/users",
            body: {
                name: 'John Test',
                email: Math.random().toString(5).substring(2)+"@gmail.com",
                gender: 'male',
                status: 'active'
            },
            headers: {
                Authorization: authToken
            }
        })
        .then((response) => {
            expect(response.status).to.eq(201)
            const userId = response.body.id

            //update the user
            cy.request({
                method: "PUT",
                url: `https://gorest.co.in/public/v2/users/${userId}`,   //uvek ide `
                body: {
                    name: 'Jack'
                },
                headers: {
                    Authorization: authToken
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq('Jack')

                //delete the user
                cy.request({
                    method: "DELETE",
                    url: `https://gorest.co.in/public/v2/users/${userId}`,
                    headers: {
                        Authorization: authToken
                    }
                })
                .then((response) => {
                    expect(response.status).to.eq(204)
                })
            })
        })

    })
})