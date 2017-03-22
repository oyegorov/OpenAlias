import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Settings } from "../model/settings";

@Injectable()
export class GameSettingsService {
    private settings: Settings;

    constructor() {
        this.settings = new Settings();
        this.settings.roundDuration = 5;
        this.settings.wordsPerPage = 4;
    }

  getSettings(): Settings {
    return this.settings;
  };
}
