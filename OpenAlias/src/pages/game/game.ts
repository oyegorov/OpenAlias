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
    private roundScore: number;
    private totalScore: number;
    private timer: number;
    private warningTimes: number[];

    words: any[];

    constructor(private navCtrl: NavController,
                private gameService: GameService,
                private gameSettingsService: GameSettingsService,
                private wordService: WordService,
                private platform: Platform) {
        this.platform.registerBackButtonAction(() => {
            this.pauseGame();
        }, 1);

        this.warningTimes = [2, 3, 4, 11];
    }

    handleBackButton() {
       this.pauseGame();
    }

    ionViewDidLoad() {

        NativeAudio.preloadSimple('ding', 'assets/audio/ding.wav');
        NativeAudio.preloadSimple('warning', 'assets/audio/warning.wav');

        this.totalScore = 0;
        this.timeLeft = this.gameSettingsService.getSettings().roundDuration;

        this.words = [];
        this.wordService.useDictionaries(this.gameSettingsService.getSelectedDictionaryIds());

        this.wordsPerPage = this.gameSettingsService.getSettings().wordsPerPage;
        this.skipLastWord = this.gameSettingsService.getSettings().skipLastWord;

        if (this.gameService.isGameResuming) {
            this.timeLeft = this.gameService.roundState.timeLeft;
            this.totalScore = this.gameService.roundState.totalScore;
            this.words = this.gameService.roundState.words;
            this.roundScore = this.gameService.roundState.roundScore;
        } else {
            this.initializeWords();
        }

        this.timer = setInterval(() => {
            if (this.timeLeft !== 0) {

                if (this.warningTimes.some(x => x === this.timeLeft)) {
                    NativeAudio.play('warning');
                }

                this.timeLeft -= 1;
            } else {
                clearInterval(this.timer);

                this.gameService.addScore(this.totalScore);
                this.gameService.changePlayer();
                this.navCtrl.setRoot(GameInfoPage);
                
            }
        }, 1000);

        this.gameService.start();
    }

    itemChecked(item) {
        NativeAudio.play('ding');
        
        item.checked = !item.checked;
        this.roundScore += item.checked ? 1 : -1;
        this.totalScore += item.checked ? 1 : -1;

        let wordsToProceed: number = this.skipLastWord ? this.wordsPerPage - 1 : this.wordsPerPage;
        if (this.roundScore === wordsToProceed) {
            this.initializeWords();
        }
    }

    discard() {
        let penalty: number = this.skipLastWord ? this.wordsPerPage - this.roundScore - 1 : this.wordsPerPage - this.roundScore;

        this.roundScore -= penalty;
        this.totalScore -= penalty;

        this.initializeWords();
    }

    initializeWords(): void {

        this.roundScore = 0;

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
            totalScore: this.totalScore,
            roundScore: this.roundScore
        };

        this.gameService.pause(gameState);
        this.navCtrl.setRoot(GameMenu);
    }
}
