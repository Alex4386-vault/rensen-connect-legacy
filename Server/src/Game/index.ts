export interface UserGameInfo {
    score: number;
    lifes: number;
    power: number;
    bombs: number;
    difficulty: GameDifficulty;
}

export enum GameDifficulty {
    EASY = "easy",
    NORMAL = "normal",
    HARD = "hard",
    LUNATIC = "lunatic",
    EXTRA = "extra"
}
