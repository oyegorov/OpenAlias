import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { GameService } from '../../providers/game-service';

@Component({
    selector: 'game-page',
    templateUrl: 'game.html'
})
export class Game {

    public timeLeft: number = 20;

    words: any[];

    constructor(public navCtrl: NavController, public gameService: GameService) {
       
    }

    ionViewDidLoad() {

        this.words = [];

        let words = this.gameService.getWords();

        for (let i = 0; i < words.length; i++) {
            this.words.push(
                {
                    word: words[i],
                    checked: false
                });
        }

        var timer = setInterval(() => {
            if (this.timeLeft != 0) {
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
