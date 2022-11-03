describe('Catch Routes', () => {
    const TEST_ROOM_SLUG = '@tEsT'
    beforeEach(() => {
        cy.intercept('/api/room', { slug: TEST_ROOM_SLUG })
        cy.intercept(`/api/room/${TEST_ROOM_SLUG}/players`, [])
    })

    it('displays Create a Room button if provided Room ID is invalid', () => {
        cy.intercept(`/api/room/${TEST_ROOM_SLUG}`, {
            statusCode: 404,
            body: {
                error: 'Could Not Find Room By Provided ID',
            },
        }).as('roomIdRequestInvalid')

        cy.visit(`/${TEST_ROOM_SLUG}`)
        cy.wait('@roomIdRequestInvalid')
        cy.get('h1')
            .contains('Could Not Find Room By Provided ID')
            .should('be.visible')
        cy.get('a').contains('Create a Room').should('be.visible')
        cy.get('a').contains('Create a Room').click()
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/create-room`)
    })

    it('displays Create a Player button if provided Room ID is valid but Player ID is not provided', () => {
        cy.intercept(`/api/room/${TEST_ROOM_SLUG}`, {
            slug: TEST_ROOM_SLUG,
        }).as('roomIdRequestValid')
        cy.visit(`/${TEST_ROOM_SLUG}`)
        cy.wait('@roomIdRequestValid')
        cy.get('h1')
            .contains('You Must Be a Player to Join a Room')
            .should('be.visible')
        cy.get('a').contains('Create a Player').should('be.visible')
        cy.get('a').contains('Create a Player').click()
        cy.url().should(
            'be.equal',
            `${Cypress.config('baseUrl')}/${TEST_ROOM_SLUG}/create-player`
        )
        cy.visit(`/${TEST_ROOM_SLUG}/game`)
        cy.get('h1')
            .contains('You Must Be a Player to Join a Room')
            .should('be.visible')
        cy.get('a').contains('Create a Player').should('be.visible')
        cy.get('a').contains('Create a Player').click()
        cy.url().should(
            'be.equal',
            `${Cypress.config('baseUrl')}/${TEST_ROOM_SLUG}/create-player`
        )
    })
})
