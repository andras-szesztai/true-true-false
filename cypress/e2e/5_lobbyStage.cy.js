/// <reference types="cypress" />

describe('Loggy Stage', () => {
    const ROOM_SLUG = '@tEsT'
    const PLAYER_SLUG = '@tEsTpLaYeR'
    const PLAYER_ONE = {
        name: 'Woodina',
        emoji: '🐈‍⬛',
        isActive: true,
        id: 1,
        role: 'ADMIN',
    }
    const PLAYER_TWO = {
        id: 2,
        name: 'Woody',
        emoji: '🐈',
        isActive: true,
    }
    beforeEach(() => {
        cy.intercept(`/api/room/${ROOM_SLUG}`, {
            slug: ROOM_SLUG,
            stage: 'LOBBY',
            roundStage: 'IDLE',
        })
    })

    it('displays correct elements while waiting for players to join', () => {
        cy.visit(`/${ROOM_SLUG}/game/${PLAYER_SLUG}`)
        const PLAYERS = [PLAYER_TWO, PLAYER_ONE]
        cy.intercept(`/api/room/${ROOM_SLUG}/player/${PLAYER_SLUG}`, {
            slug: PLAYER_SLUG,
            ...PLAYER_ONE,
        })
        cy.intercept(`/api/room/${ROOM_SLUG}/players`, PLAYERS).as(
            'playersRequest'
        )
        cy.wait('@playersRequest')
        cy.get('h1').contains('2 Players in the Lobby').should('be.visible')
        cy.get('h1').contains('Waiting for Others to Join').should('be.visible')
        cy.get('h1').contains(ROOM_SLUG).should('be.visible')
        PLAYERS.forEach((d) => {
            cy.get('p').contains(d.name).should('be.visible')
        })
    })

    it('display Start button for admin user', () => {
        cy.visit(`/${ROOM_SLUG}/game/${PLAYER_SLUG}`)
        cy.intercept(`/api/room/${ROOM_SLUG}/player/${PLAYER_SLUG}`, {
            slug: PLAYER_SLUG,
            ...PLAYER_ONE,
        })
        cy.intercept(`/api/room/${ROOM_SLUG}/players`, [PLAYER_ONE])
        cy.intercept(`/api/room/${ROOM_SLUG}/update-room-stage/PREPARATION`, {
            success: true,
        }).as('preparationStageRequest')
        cy.get('h1').contains('2 Players in the Lobby').should('not.exist')
        cy.get('button').contains('Start').as('startButton')
        cy.get('@startButton').should('be.visible')
        cy.get('@startButton').should('be.disabled')
        cy.intercept(`/api/room/${ROOM_SLUG}/players`, [
            PLAYER_ONE,
            PLAYER_TWO,
        ]).as('playersRequest')
        cy.wait('@playersRequest')
        cy.wait('@playersRequest')
        cy.get('h1').contains('2 Players in the Lobby').should('be.visible')
        cy.get('@startButton').should('not.be.disabled')
        cy.get('@startButton').click()
        cy.wait('@preparationStageRequest')
        cy.get('h1').contains('Just One More Second').should('be.visible')
    })
})
