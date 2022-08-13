export type Points = {
    selectedPlayer: number
    correctlyGuessed: number
    falselyGuessed: number
} | null

export type PlayerPoint = { playerId: number; score: number }
