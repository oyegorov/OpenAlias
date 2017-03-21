import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Game } from "../game/game";

/*
  Generated class for the GameMenu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-game-menu',
  templateUrl: 'game-menu.html'
})
export class GameMenu {

    constructor(public navCtrl: NavController, public navParams: NavParams) { }

    startGame() {
        this.navCtrl.setRoot(Game);
    }

    exitGame() {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameMenuPage');
  }

}
