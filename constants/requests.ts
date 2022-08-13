export const REFRESH_INTERVAL = 5

export const POST_ROOM_REQUEST_FIELDS = {
    slug: true,
}

export const GET_ROOM_REQUEST_FIELDS = {
    slug: true,
    id: true,
    stage: true,
    selectedPlayerId: true,
    roundStage: true,
    isLastRound: true,
    questionsLeft: true,
}

export const GET_PLAYERS_REQUEST_FIELDS = {
    name: true,
    emoji: true,
    isActive: true,
    id: true,
    role: true,
    showLoading: true,
    score: true,
}

export const POST_PLAYER_REQUEST_FIELD = {
    id: true,
    slug: true,
}

export const GET_PLAYER_REQUEST_FIELD = {
    id: true,
    slug: true,
    name: true,
    emoji: true,
    role: true,
    isActive: true,
    statements: true,
    showLoading: true,
    score: true,
    selectedAnswerId: true,
}

export const GET_STATEMENT_FOR_QUESTION_REQUEST_FIELD = {
    id: true,
    text: true,
}
