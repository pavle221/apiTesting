import login from "../../PageObjects/loginPage2.js"  //ovako uvek importujes
// da bi videli prvi approach, promeniti loginpage2.js u loginpage.js

describe('Page Object Model', () => {
    
    //standardna prica
    it('Login page test', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com')
        cy.get('input[placeholder="Username"]').type('Admin')
        cy.get('input[placeholder="Password"]').type('admin123')
        cy.get("button[type='submit']").click()
        cy.get('h6').should('have.text', 'Dashboard')
    })

    //pom prica
    it('Login page POM', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com')
        const ln = new login()
        ln.setUserName("Admin")
        ln.setPassword('admin123')      //ln je object reference variable, koristi to
        ln.clickSubmit()
        ln.verifyLogin()
    })

    //pom prica with fixtures
    it.only('Login page POM using fixtures', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com')
        cy.fixture('orangehrm.json').then((data) => {
            const ln = new login()
            ln.setUserName(data.username)
            ln.setPassword(data.password)
            ln.clickSubmit()
            ln.verifyLogin()
        })
        
    })
})