describe('404 Page', () => {
    it('displays when invalid url is entered', () => {
        cy.visit('/404', { failOnStatusCode: false })
        cy.get('h1').contains('404 - Page Not Found').should('be.visible')
        cy.get('a').contains('Back home').should('be.visible')
        cy.get('a').contains('Back home').click()
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/`)
    })
})
