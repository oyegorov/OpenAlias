import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WordService } from '../../providers/word-service'
import { DictionaryInfo } from '../../data/dictionaries'
import { SettingsPage } from "../settings/settings";
import { GameSettingsService } from "../../providers/game-settings-service";
import { GameService } from "../../providers/game-service";

@Component({
    selector: 'page-dictionaries-selection',
    templateUrl: 'dictionaries-selection.html'
})
export class DictionariesSelectionPage {
    public selectedDictionariesCount: number = 0;
    public checkStatus: any = {};

    public difficulties: string[] = ['easy', 'normal', 'hard', 'very hard'];

    public dictionaries: DictionaryInfo[];

    constructor(private navCtrl: NavController, private navParams: NavParams, private wordService: WordService, private settingsService: GameSettingsService, private gameService: GameService) { }

    ionViewDidLoad() {
        this.loadDictionaries('ru');
    }

    loadDictionaries(language: string) {
        this.dictionaries = this.wordService.getDictionaries().filter(dic => dic.language === language).sort((d1, d2) => d1.difficulty - d2.difficulty);
    }

    goToSettings() {
        this.settingsService.setSelectedDictionaryIds(this.getSelectedDictionaryIds());

        this.navCtrl.push(SettingsPage);
    }

    dictionaryChecked(dictionaryId: number) {
        if (this.checkStatus[dictionaryId]) {
            delete this.checkStatus[dictionaryId];
            this.selectedDictionariesCount--;
        } else {
            this.checkStatus[dictionaryId] = true;
            this.selectedDictionariesCount++;
        }
    }

    private getSelectedDictionaryIds(): number[] {
        let selectedDictionaries = [];
        Object.keys(this.checkStatus).forEach(k => selectedDictionaries.push(parseInt(k)));
        return selectedDictionaries;
    }
}
