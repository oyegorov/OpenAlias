import { Component } from '@angular/core';

import { Platform, NavController, NavParams } from 'ionic-angular';

import { GameInfoPage } from '../game-info/game-info';
import { RoundCorrectionsPage } from '../round-corrections/round-corrections';
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
    private currentScreenScore: number;
    private totalScore: number;
    private timer: number;
    private warningTimes: number[];

    currentScreenWords: any[];
    words: any[];

    constructor(private navCtrl: NavController,
                private gameService: GameService,
                private gameSettingsService: GameSettingsService,
                private wordService: WordService,
                private platform: Platform) {
        this.platform.registerBackButtonAction(() => {
            this.handleBackButton();
        }, 1);

        this.warningTimes = [2, 3, 4, 11];
    }

    handleBackButton() {
        if (this.timeLeft > 0)
            this.pauseGame();
    }

    ionViewDidLoad() {

        NativeAudio.preloadSimple('ding', 'assets/audio/ding.wav');
        NativeAudio.preloadSimple('warning', 'assets/audio/warning.wav');

        this.totalScore = 0;
        this.timeLeft = this.gameSettingsService.getSettings().roundDuration;

        this.currentScreenWords = [];
        this.words = [];
        this.wordService.useDictionaries(this.gameSettingsService.getSelectedDictionaryIds());

        this.wordsPerPage = this.gameSettingsService.getSettings().wordsPerPage;
        this.skipLastWord = this.gameSettingsService.getSettings().skipLastWord;

        if (this.gameService.isGameResuming) {
            this.timeLeft = this.gameService.roundState.timeLeft;
            this.words = this.gameService.roundState.words;
            this.totalScore = this.gameService.roundState.totalScore;
            this.currentScreenWords = this.gameService.roundState.currentScreenWords;
            this.currentScreenScore = this.gameService.roundState.currentScreenScore;
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

                this.gameService.endRound(this.getRoundState());

                this.navCtrl.setRoot(RoundCorrectionsPage);
            }
        }, 1000);

        this.gameService.start();
    }

    itemChecked(item) {
        NativeAudio.play('ding');
        
        item.checked = !item.checked;
        this.currentScreenScore += item.checked ? 1 : -1;
        this.totalScore += item.checked ? 1 : -1;

        let wordsToProceed: number = this.skipLastWord ? this.wordsPerPage - 1 : this.wordsPerPage;
        if (this.currentScreenScore === wordsToProceed) {
            this.initializeWords();
        }
    }

    discard() {
        let penalty: number = this.skipLastWord ? this.wordsPerPage - this.currentScreenScore - 1 : this.wordsPerPage - this.currentScreenScore;

        this.currentScreenScore -= penalty;
        this.totalScore -= penalty;

        for (let i = 0; i < this.currentScreenWords.length && penalty !=0; i++) {
            if (!this.currentScreenWords[i].checked) {
                this.currentScreenWords[i].dismissed = true;
                penalty--;
            }
        }

        this.initializeWords();
    }

    initializeWords(): void {
        this.currentScreenScore = 0;

        let currentScreenWords = this.wordService.getWords(this.wordsPerPage);

        this.currentScreenWords = [];

        for (let i = 0; i < currentScreenWords.length; i++) {
            this.currentScreenWords.push(
                {
                    word: currentScreenWords[i],
                    checked: false
                });
        }

        this.words = this.words.concat(this.currentScreenWords);
    }

    pauseGame() {
        clearInterval(this.timer);

        this.gameService.pause(this.getRoundState());
        this.navCtrl.setRoot(GameMenu, { page: Game });
    }

    getRoundState() : RoundState {
        return {
            timeLeft: this.timeLeft,
            words: this.words,
            currentScreenWords: this.currentScreenWords,
            totalScore: this.totalScore,
            currentScreenScore: this.currentScreenScore
        };
    }
}
