/// <reference types="cypress" />

describe('Create Room Page', () => {
    const TEST_SLUG = '@tEsT'
    beforeEach(() => {
        cy.visit('/create-room')
        cy.get('h1')
            .contains('One Second, We Are Preparing Your Room')
            .as('loadingText')
    })
    it('creates room with returned slug as id & redirects to create-player (admin) page', () => {
        cy.intercept('/api/room', (req) => {
            req.reply({
                delay: 3000,
                body: {
                    slug: TEST_SLUG,
                },
            })
        }).as('createRoomRequest')
        cy.intercept(`/api/room/${TEST_SLUG}`, { slug: TEST_SLUG })
        cy.intercept(`/api/room/${TEST_SLUG}/players`, [])
        cy.get('@loadingText').should('be.visible')
        cy.wait('@createRoomRequest')
        cy.url().should(
            'be.equal',
            `${Cypress.config('baseUrl')}/${TEST_SLUG}/create-player/admin`
        )
    })
    it('display error message if request to create room failed', () => {
        cy.intercept('GET', '/api/room', (req) => {
            req.reply({
                delay: 3000,
                statusCode: 400,
            })
        }).as('createRoomRequest')
        cy.get('@loadingText').should('be.visible')
        cy.wait('@createRoomRequest')
        cy.get('@loadingText').should('not.exist')
        cy.get('h1')
            .contains(
                'Sorry, Something Went Wrong While Creating Your Room. Please Try Again!'
            )
            .should('be.visible')
    })
})
