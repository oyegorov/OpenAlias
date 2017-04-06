import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RoundState } from "../../model/round-state";
import { GameService } from '../../providers/game-service';
import { GameSettingsService } from '../../providers/game-settings-service';
import { GameMenu } from '../game-menu/game-menu';
import { GameInfoPage } from '../game-info/game-info';

@Component({
    selector: 'page-round-corrections',
    templateUrl: 'round-corrections.html'
})
export class RoundCorrectionsPage {
    public totalScore: number;
    public roundState: RoundState;

    constructor(public navCtrl: NavController, private gameService: GameService) {
        this.roundState = this.gameService.roundState;
    }

    ionViewDidLoad() {
        this.roundState = this.gameService.roundState;
        this.updateTotalScore();
    }

    setNeutral(w) {
        w.checked = false;
        w.dismissed = false;
        this.updateTotalScore();
    }

    setDismissed(w) {
        w.checked = false;
        w.dismissed = true;
        this.updateTotalScore();
    }

    setChecked(w) {
        w.checked = true;
        w.dismissed = false;
        this.updateTotalScore();
    }

    handleBackButton() {
        this.gameService.pause(this.roundState);
        this.navCtrl.setRoot(GameMenu);
    }

    proceed() {
        this.gameService.addScore(this.totalScore);
        this.gameService.changePlayer();
        this.navCtrl.setRoot(GameInfoPage);
    }

    private updateTotalScore() {
        let totalScore: number = 0;
        this.roundState.words.forEach(w => {
            if (w.checked)
                totalScore++;
            if (w.dismissed)
                totalScore--;
        });

        this.totalScore = totalScore;
    }
}
