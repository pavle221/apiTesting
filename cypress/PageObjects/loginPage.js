
class login
{
    setUserName(username)
    {
        cy.get("input[placeholder='Username']").type(username)
    }

    setPassword(password)
    {
        cy.get("input[placeholder='Password']").type(password)
    }

    clickSubmit()
    {
        cy.get('button[type="submit"]').click()
    }

    verifyLogin()
    {
       cy.get("h6").should('have.text', 'Dashboard') 
    }
}

export default login  //ovo uvek stavljas na kraju, kada zelis da koristis klasu koju si napravio