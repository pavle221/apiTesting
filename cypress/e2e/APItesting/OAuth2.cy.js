
//prereq generate auth code
//https://github.com/login/oauth/authorize/{client_id}
//https://github.com/login/oauth/authorize/Ov23liHCmfG6P5xtda8h

/* first step
get the oauth acces token
POST https://github.com/login/oauth/access_token
query params client id client secret code

second step
send GET by using access token https://api.github.com/user/repos
auth: accessToken
*/

describe('OAuth2 authentications', () => {

    let accessToken = ""
    let clientId = Cypress.env('token koji mora da se generise svakih 5min')
    let clientSecret = Cypress.env('token iz settingsa')
    let code = Cypress.env('generisani kod nakon autentikacije ')

    it('Get the OAuth2 access token', () => {
        cy.request({
            method: "POST",
            url: "https://github.com/login/oauth/access_token",
            qs: {
                client_id: clientId,
                client_secret: clientSecret,      //sve ove parametre dobijas na gitu u settingsu
                code: code
            }
        })
        .then((response) => {
            //access_token=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&scope=&token_type=bearer
            //const params = response.body.split('&') //splituje na ono pre enda i ono posle enda
            //accessToken = params[0].split('=') [1] //splituje na ono pre equala i posle, a ova jedinica znaci da trazim ono posle equala tj token
            
        })
    })

    it('Use the generated token', () => {

        cy.request({
            method: "GET",
            url: 'https://api.github.com/user/repos',
            headers: {
                Authorization: 'Bearer '+ accessToken
            }
        })
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
            expect(response.body[0].id).to.eq(872048713)
        })
        
    })


})