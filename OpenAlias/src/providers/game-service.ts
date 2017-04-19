import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Dictionary, dictionaries } from "../data/dictionaries"

import { Player } from "../model/player";
import { PlayerScores } from "../model/player-scores";
import { GameSettingsService } from "../providers/game-settings-service";
import { RoundState } from "../model/round-state";

@Injectable()
export class GameService {
    private playerScores: PlayerScores[];
    private currentPlayerIndex: number;
    private timeLeft: number;
    public isGameRunning: boolean;
    public isGameResuming: boolean;
    public roundState: RoundState;
    public roundNumber: number;

    constructor(private settingsService: GameSettingsService) {
        this.isGameRunning = false;
        this.isGameResuming = false;
        this.roundNumber = 1;
    }

    finishGame() {
        this.isGameRunning = false;
        this.isGameResuming = false;
        this.roundNumber = 1;
        this.roundState = null;
    }

    endRound(roundState: RoundState): void {
        this.roundState = roundState;
    }

    pause(roundState:RoundState): void {
        this.roundState = roundState;
    }

    start() {
        this.isGameRunning = true;
        this.isGameResuming = false;
    }

    resume() {
        this.isGameResuming = true;
    }

    addPlayers(players: Player[]) {
        this.playerScores = [];
        this.currentPlayerIndex = 0;

        players.forEach((player, index) => {
            let ps = new PlayerScores(player);
            ps.isActive = (index === 0);
            this.playerScores.push(ps);
        });
    }

    getPlayerScores(): PlayerScores[]
    {
        return this.playerScores;
    }

    addScore(score:number) {
        this.playerScores[this.currentPlayerIndex].addScore(score);
    }

    changePlayer() {
        this.playerScores[this.currentPlayerIndex].isActive = false;

        if (this.currentPlayerIndex + 1 === this.playerScores.length) {
            this.currentPlayerIndex = 0;
            this.roundNumber++;
        } else {
            this.currentPlayerIndex++;
        }

        this.playerScores[this.currentPlayerIndex].isActive = true;
    }

    getActivePlayer(): Player {
        return this.playerScores[this.currentPlayerIndex].player;
    }
}
