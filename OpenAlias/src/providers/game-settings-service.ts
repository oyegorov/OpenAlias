import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Settings } from "../model/settings";
import { Player } from "../model/player";

@Injectable()
export class GameSettingsService {
    private settings: Settings;
    private teams: Player[];
    private selectedDictionaryIds: number[];

    constructor() {
        this.settings = new Settings();
        this.settings.roundDuration = 5;
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

    getTeams(): Player[] {
        return this.teams;
    }

    setTeams(teams: Player[]) {
        if (teams == null)
            throw new Error('teams == null');

        this.teams = teams;
    };

    getSelectedDictionaryIds(): number[] {
        return this.selectedDictionaryIds;
    }

    setSelectedDictionaryIds(selectedDictionaryIds: number[]) {
        if (selectedDictionaryIds == null)
            throw new Error('selectedDictionaryIds == null');

        this.selectedDictionaryIds = selectedDictionaryIds;
    };
}
