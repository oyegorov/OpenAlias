import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Dictionary, dictionaries } from "../data/dictionaries"

import { Player } from "../model/player";
import { PlayerScores } from "../model/playerScores";
import { GameSettingsService } from "../providers/game-settings-service";

@Injectable()
export class GameService {
    private playerScores: PlayerScores[];
    private currentPlayerIndex: number;

    constructor(private settingsService: GameSettingsService) {
    }

    startGame() {
        this.playerScores = [];
        this.currentPlayerIndex = 0;

        let players = this.settingsService.getTeams();

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
        } else {
            this.currentPlayerIndex++;
        }

        this.playerScores[this.currentPlayerIndex].isActive = true;

    }

    getActivePlayer(): Player {
        return this.playerScores[this.currentPlayerIndex].player;
    }
}
