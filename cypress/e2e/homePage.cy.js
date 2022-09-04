/// <reference types="cypress" />

// TODO
// - make create-room POST
// - make testS and invalid fixture or just const

describe('Home Page', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('a').contains('Create a Room').as('createRoomButton')
        cy.get('input').as('joinRoomInput')
        cy.get('a').contains('Join').as('joinButton')
        cy.get('button').contains('How to Play?').as('howToPlayButton')
        cy.intercept('/api/room/testS', {
            slug: 'testS',
            stage: 'LOBBY',
        }).as('getRoomRequestValid')
        cy.intercept('/api/room/testS/players', [])
    })

    it('displays correct elements with correct text on mount', () => {
        cy.get('h1').contains('TrueTrueFalse').should('be.visible')
        cy.get('@createRoomButton').should('be.visible')
        cy.get('@joinRoomInput').should('be.visible')
        cy.get('@joinRoomInput')
            .invoke('attr', 'placeholder')
            .should('contain', 'Enter Room ID')
        cy.get('@joinButton').should('be.visible')
        cy.get('@joinButton')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(249, 218, 168)')
        cy.get('@howToPlayButton').should('be.visible')
    })

    it('redirects to correct url & creates room on @createRoomButton click', () => {
        cy.intercept('/api/room', { slug: 'testS' }).as('createRoomRequest')
        cy.get('@createRoomButton').click()
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/create-room`)
    })

    it('types into @joinRoomInput and enables @joinButton if roomId is correct', () => {
        cy.intercept('/api/room/inVal').as('getRoomRequestInvalid')
        cy.get('@joinRoomInput').type('inVal')
        cy.wait('@getRoomRequestInvalid')
        cy.get('span')
            .contains('Could Not Find Room By Provided ID')
            .should('be.visible')
        cy.get('@joinButton')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(249, 218, 168)')
        cy.get('@joinRoomInput').clear().type('testS')
        cy.wait('@getRoomRequestValid')
        cy.get('span')
            .contains('Could Not Find Room By Provided ID')
            .should('not.be.exist')
        cy.get('@joinButton')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(246, 193, 92)')
        cy.get('@joinButton').click()
        cy.url().should(
            'be.equal',
            `${Cypress.config('baseUrl')}/testS/create-player`
        )
    })

    it('redirects to room lobby on enabled @joinButton click', () => {})

    it('opens game rules on @howToPlayButton click', () => {})

    it('focuses on elements with keyboard navigation', () => {})
})
