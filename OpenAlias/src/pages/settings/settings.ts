import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GameSettingsService } from '../../providers/game-settings-service';
import { SoundService } from '../../providers/sound-service';
import { Settings } from '../../model/settings';
import { GameInfoPage } from '../game-info/game-info';

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    settings: Settings;
    disableSkipLastWord: boolean = false;

    constructor(private navCtrl: NavController, private gameSettingsService: GameSettingsService, private soundService: SoundService) {
        this.settings = this.gameSettingsService.getSettings();
    }

    ionViewDidLoad() {
    }

    startGame() {
        this.gameSettingsService.setSettings(this.settings);
        this.soundService.setVolume(this.settings.volume / 10);

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
