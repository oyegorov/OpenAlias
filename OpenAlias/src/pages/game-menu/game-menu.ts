import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from "../settings/settings";
import { TeamsPage } from "../teams/teams";

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

    openSettings() {
        this.navCtrl.push(SettingsPage);
    }

    openTeams() {
        this.navCtrl.push(TeamsPage);
    }

    exitGame() {

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GameMenuPage');
  }

}
