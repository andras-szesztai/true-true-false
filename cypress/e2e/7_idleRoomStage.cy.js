describe('Idle Room Stage', () => {
    const ROOM_SLUG = '@tEsT'
    const PLAYER_SLUG = '@tEsTpLaYeR'
    const PLAYER_ONE = {
        slug: PLAYER_SLUG,
        role: 'ADMIN',
        name: 'Woodina',
        emoji: '🐈‍⬛',
        isActive: true,
        id: 1,
    }
    const PLAYER_TWO = {
        id: 2,
        name: 'Woody',
        emoji: '🐈',
        isActive: true,
        role: 'USER',
        slug: PLAYER_SLUG,
    }

    beforeEach(() => {
        cy.intercept(`/api/room/${ROOM_SLUG}`, {
            slug: ROOM_SLUG,
            stage: 'GAME',
            roundStage: 'IDLE',
        }).as('roomRequest')
        cy.intercept(`/api/room/${ROOM_SLUG}/players`, [
            PLAYER_ONE,
            PLAYER_TWO,
        ]).as('playersRequest')
    })

    it('should show Start First Round button for Admin', () => {
        cy.intercept(
            `/api/room/${ROOM_SLUG}/player/${PLAYER_SLUG}`,
            PLAYER_ONE
        ).as('playerRequest')
        // TODO - PUT or POST
        cy.intercept(`/api/room/${ROOM_SLUG}/start-round`, {
            success: true,
        }).as('startRoundRequest')
        cy.visit(`/${ROOM_SLUG}/game/${PLAYER_SLUG}`)
        cy.wait('@roomRequest')
        cy.wait('@playerRequest')
        cy.wait('@playersRequest')
        cy.get('button').contains('Start First Round').as('startButton')
        cy.get('@startButton').should('be.visible')
        cy.get('@startButton').should('be.enabled')
        cy.get('@startButton').click()
        cy.wait('@startRoundRequest')
        cy.get('h1').contains('Just One More Second').should('be.visible')
    })

    it('show correct elements for non-admin users', () => {
        cy.intercept(
            `/api/room/${ROOM_SLUG}/player/${PLAYER_SLUG}`,
            PLAYER_TWO
        ).as('nonAdminPlayerRequest')
        cy.visit(`/${ROOM_SLUG}/game/${PLAYER_SLUG}`)
        cy.wait('@roomRequest')
        cy.wait('@nonAdminPlayerRequest')
        cy.wait('@playersRequest')
        cy.get('h1')
            .contains('Waiting for Admin to Start First Round ')
            .should('be.visible')
    })
})
