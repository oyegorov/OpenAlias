import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from "../settings/settings";
import { TeamsPage } from "../teams/teams";
import { Game } from "../game/game";

import { GameService } from '../../providers/game-service';

import { NativeAudio } from 'ionic-native';

import { Platform } from 'ionic-angular';

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
        private gameService: GameService,
        private platform: Platform) {

        this.isGameRunning = gameService.isGameRunning;

        NativeAudio.preloadSimple('all_she_wants', 'assets/audio/all_that_she_wants_i.mp3');
    }

    openSettings() {
        NativeAudio.play('all_she_wants');
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
        this.platform.exitApp();
    }

  ionViewDidLoad() {
  }

}
