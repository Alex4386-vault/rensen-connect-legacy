export interface UserGameInfo {
    score: number;
    life: number;
    power: number;
    bomb: number;
    difficulty: GameDifficulty;
}

export enum GameDifficulty {
    EASY = "easy",
    NORMAL = "normal",
    HARD = "hard",
    LUNATIC = "lunatic",
}
