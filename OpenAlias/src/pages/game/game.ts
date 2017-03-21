import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { GameService } from '../../providers/game-service';

@Component({
    selector: 'game-page',
    templateUrl: 'game.html'
})
export class Game {
    selectedItem: any;
    icons: string[];
    items: Array<{ title: string, note: string, icon: string }>;
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
    }

    itemChecked(item) {
        console.log(item);
        item.checked = true;
    }
}
