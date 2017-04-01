import { Component } from '@angular/core';

import { Platform, NavController, NavParams } from 'ionic-angular';

import { GameInfoPage } from '../game-info/game-info';
import { GameMenu } from '../game-menu/game-menu';

import { GameService } from '../../providers/game-service';
import { GameSettingsService } from '../../providers/game-settings-service';
import { WordService } from '../../providers/word-service';

import { RoundState } from "../../model/round-state";

import { NativeAudio } from 'ionic-native';

@Component({
    selector: 'game-page',
    templateUrl: 'game.html'
})
export class Game {

    private timeLeft: number;
    private wordsPerPage: number;
    private skipLastWord: boolean;
    private wordsCheckedCount: number;
    private totalWordsCheckedCount: number;
    private timer: number;

    words: any[];

    constructor(private navCtrl: NavController,
                private gameService: GameService,
                private gameSettingsService: GameSettingsService,
                private wordService: WordService,
                private platform: Platform) {
        this.platform.registerBackButtonAction(() => {
            this.pauseGame();
        }, 1);
    }

    handleBackButton() {
       this.pauseGame();
    }

    ionViewDidLoad() {

        NativeAudio.preloadSimple('ding', 'assets/audio/ding.wav');

        this.totalWordsCheckedCount = 0;
        this.timeLeft = this.gameSettingsService.getSettings().roundDuration;

        this.words = [];
        this.wordService.useDictionaries(this.gameSettingsService.getSelectedDictionaryIds());

        this.wordsPerPage = this.gameSettingsService.getSettings().wordsPerPage;
        this.skipLastWord = this.gameSettingsService.getSettings().skipLastWord;

        if (this.gameService.isGameResuming) {
            this.timeLeft = this.gameService.roundState.timeLeft;
            this.totalWordsCheckedCount = this.gameService.roundState.checkedWordsCount;
            this.words = this.gameService.roundState.words;
            this.wordsCheckedCount = this.gameService.roundState.wordsCheckedCount;
        } else {
            this.initializeWords();
        }

        this.timer = setInterval(() => {
            if (this.timeLeft !== 0) {
                this.timeLeft -= 1;
            } else {
                clearInterval(this.timer);

                this.gameService.addScore(this.totalWordsCheckedCount);
                this.gameService.changePlayer();
                this.navCtrl.setRoot(GameInfoPage);
                
            }
        }, 1000);

        this.gameService.start();
    }

    itemChecked(item) {
        NativeAudio.play('ding', () => console.log('done playing'));
        
        item.checked = !item.checked;
        this.wordsCheckedCount += item.checked ? 1 : -1;
        this.totalWordsCheckedCount += item.checked ? 1 : -1;

        let wordsToProceed: number = this.skipLastWord ? this.wordsPerPage - 1 : this.wordsPerPage;
        if (this.wordsCheckedCount === wordsToProceed) {
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

    pauseGame() {
        clearInterval(this.timer);

        let gameState: RoundState = {
            timeLeft: this.timeLeft,
            words: this.words,
            checkedWordsCount: this.totalWordsCheckedCount,
            wordsCheckedCount: this.wordsCheckedCount
        };

        this.gameService.pause(gameState);
        this.navCtrl.setRoot(GameMenu);
    }
}
