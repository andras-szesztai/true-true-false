describe('Guess Reveal Round Stage', () => {
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
        selectedAnswerId: 1,
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
            roundStage: 'GUESS_REVEAL',
            selectedPlayerId: 2,
            questionsLeft: 8,
        }).as('roomRequest')
        cy.intercept(`/api/room/${ROOM_SLUG}/players`, [
            PLAYER_ONE,
            PLAYER_TWO,
        ]).as('playersRequest')
        cy.intercept(`/api/room/${ROOM_SLUG}/statement/2/for-reveal`, {
            falseStatement: { id: 2 },
            guesses: [{ id: 1, selectedAnswerId: 1 }],
        }).as('revealRequest')
        cy.intercept(`/api/room/${ROOM_SLUG}/statement/2/for-question`, {
            fixture: 'statements',
        }).as('statementsRequest')
    })

    it('should display statements and Reveal Button if Player is ADMIN', () => {
        // TODO - PUT
        cy.intercept(`/api/room/${ROOM_SLUG}/update-round-stage/FALSE_REVEAL`, {
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
        cy.wait('@revealRequest')
        cy.wait('@playersRequest')
        cy.fixture('statements').then((statements) => {
            statements.forEach((s, i) => {
                cy.get('p').contains(s.text).should('be.visible')
                if (i === 0) {
                    cy.get('p')
                        .contains(s.text)
                        .siblings()
                        .contains(PLAYER_ONE.emoji)
                        .should('be.visible')
                }
            })
        })
        cy.get('button').contains('Reveal False').as('revealButton')
        cy.get('@revealButton').should('be.visible')
        cy.get('@revealButton').should('not.be.disabled')
        cy.get('@revealButton').click()
        cy.get('h1').contains('Just One More Second').should('be.visible')
        cy.wait('@roundStageUpdateRequest')
    })

    it('should display statements without Reveal Button if Player is not ADMIN', () => {
        cy.intercept(
            `/api/room/${ROOM_SLUG}/player/${PLAYER_SLUG}`,
            PLAYER_TWO
        ).as('playerRequest')
        cy.visit(`/${ROOM_SLUG}/game/${PLAYER_SLUG}`)
        cy.wait('@roomRequest')
        cy.wait('@playerRequest')
        cy.wait('@playersRequest')
        cy.wait('@statementsRequest')
        cy.wait('@revealRequest')
        cy.wait('@playersRequest')
        cy.fixture('statements').then((statements) => {
            statements.forEach((s, i) => {
                cy.get('p').contains(s.text).should('be.visible')
                if (i === 0) {
                    cy.get('p')
                        .contains(s.text)
                        .siblings()
                        .contains(PLAYER_ONE.emoji)
                        .should('be.visible')
                }
            })
        })
        cy.contains('Reveal False').should('not.exist')
    })
})
