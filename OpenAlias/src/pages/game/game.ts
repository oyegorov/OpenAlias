import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { GameService } from '../../providers/game-service';
import { GameSettingsService } from '../../providers/game-settings-service';
import { WordService } from '../../providers/word-service';

@Component({
    selector: 'game-page',
    templateUrl: 'game.html'
})
export class Game {

    public timeLeft: number = 20;

    words: any[];

    constructor(public navCtrl: NavController,
        private gameService: GameService,
        private gameSettingsService: GameSettingsService,
        private wordService: WordService) {

        this.timeLeft = gameSettingsService.getSettings().roundDuration;
    }

    ionViewDidLoad() {

        this.words = [];

        this.wordService.useDictionaries([1]);

        let words = this.wordService.getWords(5);

        for (let i = 0; i < words.length; i++) {
            this.words.push(
                {
                    word: words[i],
                    checked: false
                });
        }

        var timer = setInterval(() => {
            if (this.timeLeft !== 0) {
                this.timeLeft -= 1;
            } else {
                clearInterval(timer);
            }
        }, 1000);
    }

    itemChecked(item) {
        console.log(item);
        item.checked = true;
    }
}
