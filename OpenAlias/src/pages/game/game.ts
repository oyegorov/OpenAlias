import { Component, ViewChild } from '@angular/core';

import { Platform, NavController, NavParams, Navbar } from 'ionic-angular';

import { GameInfoPage } from '../game-info/game-info';
import { RoundCorrectionsPage } from '../round-corrections/round-corrections';
import { GameMenu } from '../game-menu/game-menu';

import { GameService } from '../../providers/game-service';
import { GameSettingsService } from '../../providers/game-settings-service';
import { WordService } from '../../providers/word-service';
import { SoundService } from '../../providers/sound-service';

import { RoundState } from "../../model/round-state";

@Component({
    selector: 'game-page',
    templateUrl: 'game.html'
})
export class Game {
    @ViewChild(Navbar) navBar: Navbar;
    private timeLeft: number;
    private wordsPerPage: number;
    private skipLastWord: boolean;
    private currentScreenScore: number;
    private totalScore: number;
    private timer: number;

    currentScreenWords: any[];
    words: any[];

    constructor(private navCtrl: NavController,
                private gameService: GameService,
                private gameSettingsService: GameSettingsService,
                private wordService: WordService,
                private platform: Platform,
                private soundService: SoundService) {
    }

    handleBackButton() {
        if (this.timeLeft > 1)
            this.pauseGame();
    }

    ionViewDidLoad() {
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

        if (this.timeLeft <= 8) {
            this.soundService.play('ticking');
        }

        this.timer = setInterval(() => {
            if (this.timeLeft !== 0) {
                if (this.timeLeft == 9) {
                    this.soundService.play('ticking');
                }

                if (this.timeLeft == 2) {
                    this.soundService.stop('ticking');
                    this.soundService.play('alarm');
                }

                this.timeLeft -= 1;
            } else {
                clearInterval(this.timer);

                this.gameService.endRound(this.getRoundState());

                this.navCtrl.setPages([{ page: GameMenu, params: { page: RoundCorrectionsPage } }, { page: RoundCorrectionsPage }]);
            }
        }, 1000);


        this.navBar.backButtonClick = (e: UIEvent) => {
            this.handleBackButton();
        }

        this.gameService.start();
    }

    itemChecked(item) {
        this.soundService.play(item.checked ? 'cancel' : 'ding');
        
        item.checked = !item.checked;
        this.currentScreenScore += item.checked ? 1 : -1;
        this.totalScore += item.checked ? 1 : -1;

        let wordsToProceed: number = this.skipLastWord ? this.wordsPerPage - 1 : this.wordsPerPage;
        if (this.currentScreenScore === wordsToProceed) {
            this.initializeWords();
        }
    }

    discard() {
        this.soundService.play('skip');

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

        this.soundService.stop('ticking');
        this.soundService.stop('alarm');

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
