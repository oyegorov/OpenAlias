import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Settings } from "../model/settings";

@Injectable()
export class GameSettingsService {
    private settings: Settings;

    constructor() {
        this.settings = new Settings();
        this.settings.roundDuration = 15;
        this.settings.wordsPerPage = 4;
    }

    getSettings(): Settings {
        return this.settings;
    };

    setSettings(settings: Settings) {
        if (settings == null)
            throw new Error('setting == null');

        this.settings = settings;
    };
}
