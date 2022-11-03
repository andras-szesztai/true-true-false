describe('Preparation Stage', () => {
    const ROOM_SLUG = '@tEsT'
    const PLAYER_SLUG = '@tEsTpLaYeR'
    const PLAYER_ONE = {
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
    }
    const PLAYERS = [PLAYER_ONE, { ...PLAYER_TWO, showLoading: true }]
    beforeEach(() => {
        cy.intercept(`/api/room/${ROOM_SLUG}`, {
            slug: ROOM_SLUG,
            stage: 'PREPARATION',
            roundStage: 'IDLE',
        }).as('roomRequest')
        cy.intercept(`/api/room/${ROOM_SLUG}/player/${PLAYER_SLUG}`, {
            slug: PLAYER_SLUG,
            role: 'ADMIN',
            ...PLAYER_ONE,
        }).as('playerRequest')
        cy.intercept(`/api/room/${ROOM_SLUG}/players`, PLAYERS).as(
            'playersRequest'
        )
        cy.intercept(
            'POST',
            `/api/room/${ROOM_SLUG}/player/${PLAYER_SLUG}/statements`,
            {
                success: true,
            }
        ).as('postStatementsRequest')
        cy.visit(`/${ROOM_SLUG}/game/${PLAYER_SLUG}`)
        cy.wait('@roomRequest')
        cy.wait('@playerRequest')
        cy.wait('@playersRequest')
    })

    it('displays correct elements when no statement is given by player yet', () => {
        cy.get('h1').contains(ROOM_SLUG).should('be.visible')
        cy.get('textarea').each((value, index) => {
            cy.get(value).should(
                'have.attr',
                'placeholder',
                `${index < 2 ? 'True' : 'False'} Statement`
            )
        })
        cy.get('button').contains('Submit')
        cy.get('button').should('be.disabled')
        PLAYERS.forEach((d) => {
            cy.get('p').contains(d.name).should('be.visible')
        })
    })

    it('allows player to enter statements and enables button when all 3 statements are entered', () => {
        cy.get('textarea').each((value) => {
            cy.get(value).type('Some statement')
        })
        cy.get('button').should('not.be.disabled')
        cy.get('button').click()
        cy.wait('@postStatementsRequest')
        cy.get('h1').contains('Waiting for Others to Submit Statements')
        cy.get('button').contains('Start').should('be.visible')
        cy.get('button').should('be.disabled')
        cy.intercept(`/api/room/${ROOM_SLUG}/player/${PLAYER_SLUG}`, {
            slug: PLAYER_SLUG,
            role: 'USER',
            ...PLAYER_ONE,
        }).as('nonAdminUserRequest')
        cy.wait('@nonAdminUserRequest')
        cy.get('button').should('not.exist')
    })

    it('allows admin to start game when enough players submitted statements', () => {
        cy.intercept(`/api/room/${ROOM_SLUG}/players`, [
            PLAYER_ONE,
            PLAYER_TWO,
        ]).as('playersReadyRequest')
        // TODO - PUT
        cy.intercept(`/api/room/${ROOM_SLUG}/update-room-stage/GAME`, {
            success: true,
        }).as('gameStageRequest')
        cy.wait('@playersReadyRequest')
        cy.get('textarea').each((value) => {
            cy.get(value).type('Some statement')
        })
        cy.get('button').should('not.be.disabled')
        cy.get('button').click()
        cy.wait('@postStatementsRequest')
        cy.get('button').contains('Start').should('be.visible')
        cy.get('button').contains('Start').click()
        cy.wait('@gameStageRequest')
        cy.get('h1').contains('Just One More Second').should('be.visible')
    })
})
