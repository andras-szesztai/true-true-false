/// <reference types="cypress" />

describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('a').contains('Create a Room').as('createRoomButton')
        cy.get('input').as('joinRoomInput')
        cy.get('a').contains('Join').as('joinButton')
        cy.get('button').contains('How to Play?').as('howToPlayButton')
    })

    it('displays correct elements with correct text on mount', () => {
        cy.get('h1').contains('TrueTrueFalse').should('be.visible')
        cy.get('@createRoomButton').should('be.visible')
        cy.get('@joinRoomInput').should('be.visible')
        cy.get('@joinRoomInput')
            .invoke('attr', 'placeholder')
            .should('contain', 'Enter Room ID')
        cy.get('@joinButton').should('be.visible')
        cy.get('@howToPlayButton').should('be.visible')
    })

    it('redirects to correct url & creates room on @createRoomButton click', () => {
        cy.intercept('/api/room', (req) => {
            req.reply({
                body: {
                    slug: 'testS',
                },
                delay: 10,
            })
        }).as('createRoomRequest')
        cy.intercept('/api/room/testS', {
            slug: 'testS',
            stage: 'LOBBY',
        })
        cy.intercept('/api/room/testS/players', [])
        cy.get('@createRoomButton').click()
        cy.get('h1')
            .contains('🧹🧽 One Second, We Are Preparing Your Room...')
            .should('be.visible')
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/create-room`)
        cy.wait('@createRoomRequest')
        cy.url().should(
            'be.equal',
            `${Cypress.config('baseUrl')}/testS/create-player/admin`
        )
    })

    it('types into @joinRoomInput and enables @joinButton if roomId is correct', () => {})

    it('redirects to room lobby on enabled @joinButton click', () => {})

    it('opens game rules on @howToPlayButton click', () => {})

    it('focuses on elements with keyboard navigation', () => {})
})
