/// <reference types="cypress" />

describe('Create Room Page', () => {
    const TEST_ROOM_SLUG = '@tEsT'
    const TEST_PLAYER_SLUG = '@PlayerSlug'
    const UNAVAILABLE_PLAYER_NAME = 'Woody'
    const AVAILABLE_PLAYER_NAME = 'Woodina'

    beforeEach(() => {
        cy.visit(`/${TEST_ROOM_SLUG}/create-player`)
        cy.intercept(`/api/room/${TEST_ROOM_SLUG}`, {
            slug: TEST_ROOM_SLUG,
            stage: 'LOBBY',
            roundStage: 'IDLE',
        }).as('roomIdRequestValid')
        cy.intercept(`/api/room/${TEST_ROOM_SLUG}/players`, [
            {
                name: UNAVAILABLE_PLAYER_NAME,
                emoji: '😀',
            },
        ])
        cy.intercept('/_next/static/development/_devPagesManifest.json').as(
            'pageLoad'
        )
        cy.get('input').as('createPlayerInput')
        cy.get('button').contains('Enter Lobby').as('enterButton')
    })

    it('displays correct elements for player creation phase', () => {
        cy.wait('@roomIdRequestValid')
        cy.get('h1').first().contains('Room')
        cy.get('h1').last().contains(`${TEST_ROOM_SLUG}`)
        cy.get('@createPlayerInput').should('be.visible')
        cy.get('@createPlayerInput').should(
            'have.attr',
            'placeholder',
            "Player's Name"
        )
        cy.get('@enterButton').should('be.visible')
    })

    it('displays disabled Enter Lobby button until available user name is selected', () => {
        cy.intercept(`/api/room/${TEST_ROOM_SLUG}/player`, {
            slug: TEST_PLAYER_SLUG,
        })
        cy.intercept(
            `/api/room/${TEST_ROOM_SLUG}/player/${TEST_PLAYER_SLUG}/connect`,
            { id: '123' }
        )
        cy.intercept(`/api/room/${TEST_ROOM_SLUG}/player/${TEST_PLAYER_SLUG}`, {
            slug: TEST_PLAYER_SLUG,
        }).as('playerRequest')
        cy.wait('@roomIdRequestValid')
        cy.get('@enterButton')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(249, 218, 168)')
        cy.get('button').first().click()
        cy.get(
            '[data-name="smileys_people"] > :nth-child(1) > button > .emoji-img'
        ).click()
        cy.get('@createPlayerInput').type(UNAVAILABLE_PLAYER_NAME)
        cy.get('span')
            .contains('Sorry, Name & Emoji Combination Is Already Taken')
            .should('be.visible')
        cy.get('@enterButton')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(249, 218, 168)')
        cy.get('@createPlayerInput').clear()
        cy.get('span')
            .contains('Sorry, Name & Emoji Combination Is Already Taken')
            .should('not.exist')
        cy.get('@createPlayerInput').type(AVAILABLE_PLAYER_NAME)
        cy.get('@enterButton')
            .should('have.css', 'background-color')
            .and('eq', 'rgb(246, 193, 92)')
        cy.get('@enterButton').click()
        cy.wait('@playerRequest')
        cy.url().should(
            'be.equal',
            `${Cypress.config(
                'baseUrl'
            )}/${TEST_ROOM_SLUG}/game/${TEST_PLAYER_SLUG}`
        )
    })

    it('handles error on player creation', () => {
        const ERROR_MESSAGE = 'Sorry, Something Went Wrong'
        cy.intercept(`/api/room/${TEST_ROOM_SLUG}/player`, {
            statusCode: 500,
            body: {
                error: ERROR_MESSAGE,
            },
        }).as('failedPlayerRequest')
        cy.wait('@roomIdRequestValid')
        cy.get('@createPlayerInput').type(AVAILABLE_PLAYER_NAME)
        cy.get('@enterButton').click()
        cy.wait('@failedPlayerRequest')
        cy.get('span').contains(ERROR_MESSAGE)
    })

    it('is keyboard navigable', () => {
        cy.wait('@roomIdRequestValid')
        cy.get('body').tab()
        cy.tab()
        cy.get('@createPlayerInput').then((input) => {
            cy.focused().should('contain', input.text())
            cy.focused().should('have.attr', 'placeholder', "Player's Name")
        })
        cy.focused().type(AVAILABLE_PLAYER_NAME)
        cy.tab()
        cy.get('@enterButton').then((button) => {
            cy.focused().should('contain', button.text())
        })
    })
})
