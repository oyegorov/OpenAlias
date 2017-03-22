import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GameService } from '../../providers/game-service';

import { Player } from "../../model/player";
import { PlayerScores } from "../../model/playerScores";

import { Game } from "../game/game";


@Component({
  selector: 'page-game-info',
  templateUrl: 'game-info.html'
})
export class GameInfoPage {
    playerScores: PlayerScores[];
    activePlayer: Player = new Player();

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private gameService: GameService) { }

  ionViewDidLoad() {
      this.playerScores = this.gameService.getPlayerScores();
      this.activePlayer = this.gameService.getActivePlayer();
  }

  startRound() {
      this.navCtrl.setRoot(Game);
  }
}
