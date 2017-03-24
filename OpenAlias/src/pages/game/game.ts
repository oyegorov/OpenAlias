import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {GameInfoPage} from '../game-info/game-info';

import { GameService } from '../../providers/game-service';
import { GameSettingsService } from '../../providers/game-settings-service';
import { WordService } from '../../providers/word-service';

@Component({
    selector: 'game-page',
    templateUrl: 'game.html'
})
export class Game {

    private timeLeft: number;
    private wordsPerPage: number;
    private wordsCheckedCount: number;
    private totalWordsCheckedCount: number;

    words: any[];

    constructor(public navCtrl: NavController,
        private gameService: GameService,
        private gameSettingsService: GameSettingsService,
        private wordService: WordService) {
    }

    ionViewDidLoad() {

        this.totalWordsCheckedCount = 0;
        this.timeLeft = this.gameSettingsService.getSettings().roundDuration;

        this.words = [];
        this.wordService.useDictionaries(this.gameSettingsService.getSelectedDictionaryIds());

        this.wordsPerPage = this.gameSettingsService.getSettings().wordsPerPage;

        this.initializeWords();

        var timer = setInterval(() => {
            if (this.timeLeft !== 0) {
                this.timeLeft -= 1;
            } else {
                clearInterval(timer);

                this.totalWordsCheckedCount += this.wordsCheckedCount;

                this.gameService.addScore(this.totalWordsCheckedCount);
                this.gameService.changePlayer();
                this.navCtrl.setRoot(GameInfoPage);
                
            }
        }, 1000);
    }

    itemChecked(item) {

        if (item.checked)
            return;

        item.checked = true;

        this.wordsCheckedCount++;

        if (this.wordsCheckedCount === this.wordsPerPage) {
            this.totalWordsCheckedCount += this.wordsCheckedCount;
            this.initializeWords();
        }
    }

    initializeWords(): void {

        this.wordsCheckedCount = 0;

        let words = this.wordService.getWords(this.wordsPerPage);

        this.words = [];

        for (let i = 0; i < words.length; i++) {
            this.words.push(
                {
                    word: words[i],
                    checked: false
                });
        }
    }
}
