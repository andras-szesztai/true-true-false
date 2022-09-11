/// <reference types="cypress" />

describe('Home Page', () => {
    const TEST_SLUG = '@tEsT'
    beforeEach(() => {
        cy.visit('/')
        cy.get('a').contains('Create a Room').as('createRoomButton')
        cy.get('input').as('joinRoomInput')
        cy.get('a').contains('Join').as('joinButton')
        cy.get('button').contains('How to Play?').as('howToPlayButton')
        cy.intercept(`/api/room/${TEST_SLUG}`, { slug: TEST_SLUG }).as(
            'getRoomRequestValid'
        )
        cy.intercept(`/api/room/${TEST_SLUG}/players`, [])
        cy.intercept('/_next/static/development/_devPagesManifest.json').as(
            'pageLoad'
        )
    })

    it('displays correct elements with correct text on mount', () => {
        cy.get('h1').contains('TrueTrueFalse').should('be.visible')
        cy.get('@createRoomButton').should('be.visible')
        cy.get('@joinRoomInput').should('be.visible')
        cy.get('@joinRoomInput').should(
            'have.attr',
            'placeholder',
            'Enter Room ID'
        )
        cy.get('@joinButton').should('be.visible')
        cy.get('@joinButton')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(249, 218, 168)')
        cy.get('@howToPlayButton').should('be.visible')
    })

    it('redirects to correct url & creates room on @createRoomButton click', () => {
        cy.intercept('/api/room', { slug: TEST_SLUG }).as('createRoomRequest')
        cy.get('@createRoomButton').click()
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/create-room`)
    })

    it('types into @joinRoomInput and enables @joinButton if roomId is correct', () => {
        cy.intercept('/api/room/inV@l').as('getRoomRequestInvalid')
        cy.get('@joinRoomInput').type('inV@l')
        cy.wait('@getRoomRequestInvalid')
        cy.get('span')
            .contains('Could Not Find Room By Provided ID')
            .should('be.visible')
        cy.get('@joinButton')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(249, 218, 168)')
        cy.get('@joinRoomInput').clear().type(TEST_SLUG)
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
            `${Cypress.config('baseUrl')}/${TEST_SLUG}/create-player`
        )
    })

    it('opens game rules on @howToPlayButton click', () => {
        cy.get('p').contains('How to Play').should('not.exist')
        cy.get('@howToPlayButton').click()
        cy.get('p').contains('How to Play').should('be.visible')
        cy.get('body').click(0, 0)
        cy.get('p').contains('How to Play').should('not.exist')
    })

    it.only('focuses on elements with keyboard navigation', () => {
        // cy.wait('@pageLoad')
        cy.get('body').tab()
        cy.get('@createRoomButton').then((button) => {
            cy.focused().should('contain', button.text())
        })
        cy.tab()
        cy.get('@joinRoomInput').then((input) => {
            cy.focused().should('contain', input.text())
            cy.focused().should('have.attr', 'placeholder', 'Enter Room ID')
        })
        cy.tab()
        cy.get('@joinButton').then((button) => {
            cy.focused().should('contain', button.text())
        })
        cy.tab()
        cy.get('@howToPlayButton').then((button) => {
            cy.focused().should('contain', button.text())
        })
    })
})
