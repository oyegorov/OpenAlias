import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Dictionary, dictionaries } from "../data/dictionaries"

import { Player } from "../model/player";
import { PlayerScores } from "../model/playerScores";

@Injectable()
export class GameService {
    private playerScores: PlayerScores[];

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

        let ps1: PlayerScores =
        {
            player: player1,
            score: []
        };

        let ps2: PlayerScores =
        {
            player: player2,
            score: []
            };

        this.playerScores.push(ps1);
        this.playerScores.push(ps2);
    }

    getPlayerScores(): PlayerScores[]
    {
        return this.playerScores;
    }
}
