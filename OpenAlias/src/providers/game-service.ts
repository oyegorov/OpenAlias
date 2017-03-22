import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Dictionary, dictionaries } from "../data/dictionaries"

import { Player } from "../model/player";
import { PlayerScores } from "../model/playerScores";

@Injectable()
export class GameService {
    private playerScores: PlayerScores[];
    private currentPlayerIndex: number;

    constructor() {
        this.playerScores = [];

        let player1: Player =
        {
            name: "Yegorov"
            };

        let player2: Player =
        {
            name: "Olsher"
        };

        let ps1: PlayerScores = new PlayerScores(player1);
        let ps2: PlayerScores = new PlayerScores(player2);

        ps1.isActive = true;
        this.currentPlayerIndex = 0;

        this.playerScores.push(ps1);
        this.playerScores.push(ps2);
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
