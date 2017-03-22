import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GameSettingsService } from '../../providers/game-settings-service';
import { Settings } from '../../model/settings';

@Component({
    selector: 'page-settings',
    templateUrl: 'settings.html'
})
export class SettingsPage {
    settings: Settings;

    constructor(private gameSettingsService: GameSettingsService) {
        this.settings = this.gameSettingsService.getSettings();
    }

    ionViewDidLoad() {
    }

    onPageWillLeave() {
        this.gameSettingsService.setSettings(this.settings);
    }
}
