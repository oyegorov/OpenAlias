import { Player } from "./player";

export class PlayerScores {
    public player: Player;
    private scores: number[];
    public isActive: boolean;

    public currentScore: number;
    public currentRoundScore: number;

    constructor(player:Player) {
        this.player = player;
        this.scores = [];
        this.currentScore = 0;
        this.isActive = false;
        this.currentRoundScore = 0;
    }

    public addScore(score: number) {
        this.scores.push(score);
        this.currentScore += score;
        this.currentRoundScore = score;
    }
}