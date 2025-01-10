describe('template spec', () => {
  it('passes', () => {
    cy.intercept({
      method: "GET",
      url: "https://example.cypress.io/**"
    }).as('getExamplePage')

    cy.visit('https://example.cypress.io')
    cy.wait('@getExamplePage').then((intercept) => {
      console.log('Intercepted: ', intercept)
      expect(intercept.state).to.eq("Complete")
    })
  })
})

