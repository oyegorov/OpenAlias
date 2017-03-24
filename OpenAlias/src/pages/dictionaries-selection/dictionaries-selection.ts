import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WordService } from '../../providers/word-service'
import { DictionaryInfo } from '../../data/dictionaries'
import { GameInfoPage } from "../game-info/game-info";

@Component({
    selector: 'page-dictionaries-selection',
    templateUrl: 'dictionaries-selection.html'
})
export class DictionariesSelectionPage {
    public checkStatus : any = {};

    public difficulties: string[] = ['easy', 'normal', 'hard', 'very hard'];

    public dictionaries: DictionaryInfo[];

    constructor(private navCtrl: NavController, private navParams: NavParams, private wordService: WordService) { }

    ionViewDidLoad() {
        this.loadDictionaries('ru');
    }

    loadDictionaries(language: string) {
        this.dictionaries = this.wordService.getDictionaries().filter(dic => dic.language === language).sort((d1, d2) => d1.difficulty - d2.difficulty);
    }

    startGame() {
        this.navCtrl.push(GameInfoPage);
    }

    dictionaryChecked(dictionaryId: number) {
        if (this.checkStatus[dictionaryId]) {
            delete this.checkStatus[dictionaryId];
        } else {
            this.checkStatus[dictionaryId] = true;
        }
    }

    private getSelectedDictionaryIds(): number[] {
        let selectedDictionaries = [];
        Object.keys(this.checkStatus).forEach(k => selectedDictionaries.push(parseInt(k)));
        return selectedDictionaries;
    }
}
