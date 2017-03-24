import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Player } from "../../model/player";
import { GameService } from "../../providers/game-service";
import { GameSettingsService } from "../../providers/game-settings-service";
import { GameInfoPage } from "../game-info/game-info";
import { DictionariesSelectionPage } from "../dictionaries-selection/dictionaries-selection"

@Component({
    selector: 'page-teams',
    templateUrl: 'teams.html'
})
export class TeamsPage {
    public selectedTeams = [];
    private allTeamNames: string[] = ['Push Keen', 'Moo Ducks', 'Chromed Dogs', 'Suicide Squad', 'Climbing Monsters', 'Deam More Awes', 'Copy-Paste Ninjas', 'Jumping Monkeys', 'Ghostbusters'];
    private availableTeams;

    constructor(private gameService: GameService, private settingsService: GameSettingsService, private navCtrl: NavController, private navParams: NavParams) {
        this.availableTeams = this.allTeamNames.slice();
        this.addTeam();
        this.addTeam();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TeamsPage');
    }

    public acceptTeams() {
        let players: Player[] = [];

        this.selectedTeams.forEach((team) => {
            let player: Player =
                {
                    name: team
                };
            players.push(player);
        });

        this.settingsService.setTeams(players);

        this.navCtrl.push(DictionariesSelectionPage);
    }

    public addTeam() {
        if (this.selectedTeams.length > 5)
            return;

        let teamIndex = Math.floor(Math.random() * this.availableTeams.length);

        this.selectedTeams.push(this.availableTeams[teamIndex]);

        var index = this.availableTeams.indexOf(this.availableTeams[teamIndex]);
        this.availableTeams.splice(index, 1);
    }

    public deleteTeam(index: number) {
        let teamToDelete = this.selectedTeams[index];
        this.selectedTeams.splice(index, 1);

        this.availableTeams.push(teamToDelete);
    }
}
