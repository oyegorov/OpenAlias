import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from "../settings/settings";
import { TeamsPage } from "../teams/teams";
import { RulesPage } from "../rules/rules";
import { Game } from "../game/game";
import { RoundCorrectionsPage } from "../round-corrections/round-corrections";
import { GameService } from '../../providers/game-service';
import { LocalizationService } from '../../providers/localization-service';
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
        private platform: Platform,
        private localizationService: LocalizationService) {
    }

    newGame() {
        this.gameService.finishGame();
        this.isGameRunning = false;

        this.navCtrl.remove(0, this.navCtrl.getViews().length);
        this.navCtrl.push(TeamsPage);
    }

    handleBackButton() {
        if (!this.isGameRunning)
            this.exitGame();
        else
            this.continue();
    }

    openRules() {
        this.navCtrl.push(RulesPage);
    }

    continue() {
        this.navCtrl.setRoot(this.navParams.get('page'));
    }

    exitGame() {
        this.platform.exitApp();
    }

    setLanguage(language: string) {
        this.localizationService.setLanguage(language);
    }

    ionViewDidLoad() {
        this.isGameRunning = this.gameService.roundState != null;
    }
}
