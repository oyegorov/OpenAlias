import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-teams',
    templateUrl: 'teams.html'
})
export class TeamsPage {
    public selectedTeams = [];
    private allTeamNames: string[] = ['Push Keen', 'Moo Ducks', 'Chromed Dogs', 'Suicide Squad', 'Climbing Monsters', 'Deam More Awes', 'Copy-Paste Ninjas', 'Jumping Monkeys', 'Ghostbusters'];
    private availableTeams;

    constructor() {
        this.availableTeams = this.allTeamNames.slice();
        this.addTeam();
        this.addTeam();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TeamsPage');
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
