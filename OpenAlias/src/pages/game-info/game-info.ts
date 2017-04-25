import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';

import { GameService } from '../../providers/game-service';
import { GameSettingsService } from '../../providers/game-settings-service';

import { Player } from "../../model/player";
import { PlayerScores } from "../../model/player-scores";
import { Settings } from "../../model/settings";

import { Game } from "../game/game";
import { GameMenu } from "../game-menu/game-menu";

@Component({
    selector: 'page-game-info',
    templateUrl: 'game-info.html'
})
export class GameInfoPage {
    GameStatus = GameStatus;
    playerScores: PlayerScores[];
    sortedPlayerScores: PlayerScores[];
    activePlayer: Player;
    startingPlayer: Player;
    roundNumber: number;
    gameStatus: GameStatus;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private gameService: GameService,
        private gameSettingsService: GameSettingsService,
        private platform: Platform) {
    }

    ionViewDidLoad() {
        this.startingPlayer = this.gameService.getPlayerScores()[0].player;
        this.playerScores = this.gameService.getPlayerScores();
        this.sortedPlayerScores = this.playerScores.concat().sort((p1, p2) => p2.currentScore - p1.currentScore);;
        this.activePlayer = this.gameService.getActivePlayer();
        this.roundNumber = this.gameService.roundNumber;

        this.gameStatus = this.getGameStatus();
    }

    private getGameStatus(): GameStatus {
        let settings = this.gameSettingsService.getSettings();

        if (this.activePlayer !== this.startingPlayer)
            return GameStatus.InProgress;

        let equalScores: boolean = this.sortedPlayerScores[0].currentScore === this.sortedPlayerScores[1].currentScore;

        if (settings.rounds > 0 && this.roundNumber === settings.rounds + 1)
            return equalScores ? GameStatus.Tie : GameStatus.Victory;
        if (settings.scoreToWin > 0 && this.sortedPlayerScores[0].currentScore >= settings.scoreToWin)
            return equalScores ? GameStatus.Tie : GameStatus.Victory;

        return GameStatus.InProgress;
    }

    handleBackButton() {
        this.navCtrl.setRoot(GameMenu, { page: GameInfoPage });
    }

    startRound() {
        this.navCtrl.setRoot(Game);
    }

    finishGame() {
        this.gameService.finishGame();
        this.navCtrl.setRoot(GameMenu);
    }
}

export enum GameStatus {
    InProgress = 1,
    Victory,
    Tie
}