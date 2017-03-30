import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GameSettingsService } from '../../providers/game-settings-service';
import { Settings } from '../../model/settings';
import { GameInfoPage } from '../game-info/game-info';

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    settings: Settings;
    disableSkipLastWord: boolean = false;

    constructor(private navCtrl: NavController, private gameSettingsService: GameSettingsService) {
        this.settings = this.gameSettingsService.getSettings();
    }

    ionViewDidLoad() {
    }

    startGame() {
        this.gameSettingsService.setSettings(this.settings);

        this.navCtrl.setRoot(GameInfoPage);
    }

    wordsPerPageChanged() {
        if (this.settings.wordsPerPage === 1) {
            this.settings.skipLastWord = false;
            this.disableSkipLastWord = true;
        } else {
            this.disableSkipLastWord = false;
        }
    }
}
