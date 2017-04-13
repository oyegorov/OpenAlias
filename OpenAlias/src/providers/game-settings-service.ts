import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Settings } from "../model/settings";
import { Player } from "../model/player";
import { Storage } from '@ionic/storage';

@Injectable()
export class GameSettingsService {
    private settings: Settings;
    private teams: Player[];
    private selectedDictionaryIds: number[];

    constructor(private storage: Storage) {
        this.settings = new Settings();
        this.settings.roundDuration = 45;
        this.settings.wordsPerPage = 6;
        this.settings.scoreToWin = 100;
        this.settings.rounds = 0;

        storage.ready().then(() => {
            storage.get('settings').then((s) => {
                if (s) {
                    this.settings = s;
                }
            });
        });
    }

    getSettings(): Settings {
        return this.settings;
    };

    setSettings(settings: Settings) {
        if (settings == null)
            throw new Error('setting == null');

        this.settings = settings;

        this.storage.set('settings', this.settings);
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
