import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from "../settings/settings";
import { TeamsPage } from "../teams/teams";
import { Game } from "../game/game";

import { GameService } from '../../providers/game-service';

/*
  Generated class for the GameMenu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-game-menu',
  templateUrl: 'game-menu.html'
})
export class GameMenu {
    private isGameRunning: boolean;

    constructor(private navCtrl: NavController,
        private navParams: NavParams,
        private gameService: GameService
    ) {
        this.isGameRunning = gameService.isGameRunning;
    }

    openSettings() {
        this.navCtrl.push(SettingsPage);
    }

    openTeams() {
        this.navCtrl.push(TeamsPage);
    }

    continue()
    {
        this.gameService.resume();
        this.navCtrl.setRoot(Game);
    }

    exitGame() {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameMenuPage');
  }

}
