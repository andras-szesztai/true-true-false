describe('Question Round Stage', () => {
    const ROOM_SLUG = '@tEsT'
    const PLAYER_SLUG = '@tEsTpLaYeR'
    const PLAYER_ONE = {
        slug: PLAYER_SLUG,
        role: 'ADMIN',
        name: 'Woodina',
        emoji: '🐈‍⬛',
        isActive: true,
        id: 1,
        score: 0,
    }
    const PLAYER_TWO = {
        id: 2,
        name: 'Woody',
        emoji: '🐈',
        isActive: true,
        role: 'USER',
        slug: PLAYER_SLUG,
        score: 0,
    }

    beforeEach(() => {
        cy.intercept(`/api/room/${ROOM_SLUG}`, {
            slug: ROOM_SLUG,
            stage: 'GAME',
            roundStage: 'QUESTION',
            selectedPlayerId: 2,
            questionsLeft: 10,
        }).as('roomRequest')
        cy.intercept(`/api/room/${ROOM_SLUG}/players`, [
            PLAYER_ONE,
            PLAYER_TWO,
        ]).as('playersRequest')
        cy.intercept(`/api/room/${ROOM_SLUG}/statement/2/for-question`, {
            fixture: 'statements',
        }).as('statementsRequest')
    })

    it('should display selectable statements & submit button for guessing player and admin features if admin', () => {
        // TODO - POST
        cy.intercept(
            `/api/room/${ROOM_SLUG}/player/${PLAYER_SLUG}/select-statement/1`,
            { success: true }
        )
        // TODO - PUT
        cy.intercept(`/api/room/${ROOM_SLUG}/update-round-stage/QUESTION_END`, {
            success: true,
        }).as('roundStageUpdateRequest')
        cy.intercept(
            `/api/room/${ROOM_SLUG}/player/${PLAYER_SLUG}`,
            PLAYER_ONE
        ).as('playerRequest')
        cy.visit(`/${ROOM_SLUG}/game/${PLAYER_SLUG}`)
        cy.wait('@roomRequest')
        cy.wait('@playerRequest')
        cy.wait('@playersRequest')
        cy.wait('@statementsRequest')
        cy.fixture('statements').then((statements) => {
            statements.forEach((s, i) => {
                cy.get('label').contains(s.text).should('be.visible')
                if (i === 0) {
                    cy.get('label').contains(s.text).as('statementToClick')
                }
            })
        })
        cy.get('div').contains('10 Questions').should('be.visible')
        cy.get('button').contains('Decrease').should('be.visible')
        cy.get('button').contains('Decrease').should('not.be.disabled')
        cy.get('button').contains('Submit').as('submitButton')
        cy.get('@submitButton').should('be.visible')
        cy.get('@submitButton').should('be.disabled')
        cy.get('@statementToClick').click()
        cy.get('@submitButton').should('not.be.disabled')
        cy.get('@submitButton').click()
        cy.intercept(`/api/room/${ROOM_SLUG}/player/${PLAYER_SLUG}`, {
            ...PLAYER_ONE,
            selectedAnswerId: 1,
        }).as('playerAnswerRequest')
        cy.wait('@playerAnswerRequest')
        cy.get('h1').contains('Everyone is ready!').should('be.visible')
        cy.wait('@playersRequest')
        cy.wait('@roomRequest')
        cy.wait('@playerAnswerRequest')
        cy.get('button').contains('End Questions Round').as('endRoundButton')
        cy.get('@endRoundButton').should('be.visible')
        cy.get('@endRoundButton').should('not.be.disabled')
        cy.get('@endRoundButton').click()
        cy.get('h1').contains('Just One More Second').should('be.visible')
        cy.wait('@roundStageUpdateRequest')
    })

    it('should display non-selectable statements for guessed player and no admin features if not admin', () => {
        cy.intercept(
            `/api/room/${ROOM_SLUG}/player/${PLAYER_SLUG}`,
            PLAYER_TWO
        ).as('playerRequest')
        cy.visit(`/${ROOM_SLUG}/game/${PLAYER_SLUG}`)
        cy.wait('@roomRequest')
        cy.wait('@playerRequest')
        cy.wait('@playersRequest')
        cy.wait('@statementsRequest')
        cy.fixture('statements').then((statements) => {
            statements.forEach((s) => {
                cy.get('label').contains(s.text).should('be.visible')
            })
        })
        cy.contains('Submit').should('not.exist')
        cy.contains('Decrease').should('not.exist')
        cy.get('h1').contains('Everyone is ready!').should('be.visible')
        cy.contains('End Questions Round').should('not.exist')
    })
})
