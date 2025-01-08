
class login
{
    txtUserName = "input[placeholder='Username']"
    txtPassword = "input[placeholder='Password']"       //da bi koristio sve ovo moras da dodas this. pa onda varijablu
    btnSubmit = "button[type='submit']"
    labelMessage = "h6"

    setUserName(username)
    {
        cy.get(this.txtUserName).type(username)
    }

    setPassword(password)
    {
        cy.get(this.txtPassword).type(password)
    }

    clickSubmit()
    {
        cy.get(this.btnSubmit).click()
    }

    verifyLogin()
    {
       cy.get(this.labelMessage).should('have.text', 'Dashboard') 
    }
}

export default login  //ovo uvek stavljas na kraju, kada zelis da koristis klasu koju si napravio