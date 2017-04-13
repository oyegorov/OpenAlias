import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GameService } from '../../providers/game-service';
import { Player } from "../../model/player";
import { PlayerScores } from "../../model/player-scores";
import { GameMenu } from "../game-menu/game-menu";

@Component({
    selector: 'page-game-results',
    templateUrl: 'game-results.html'
})
export class GameResultsPage {
    winner: Player;
    playerScores: PlayerScores[];
    isTie: boolean;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private gameService: GameService) { }

    ionViewDidLoad() {
        this.playerScores = this.gameService.getPlayerScores().sort((p1, p2) => p1.currentScore - p2.currentScore);
        this.isTie = this.playerScores[0].currentScore == this.playerScores[1].currentScore;
        this.winner = this.playerScores[0].player;
    }

    finishGame() {
        this.navCtrl.setRoot(GameMenu);
    }
}
