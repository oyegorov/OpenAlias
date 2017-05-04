import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LocalizationService } from "../../providers/localization-service";

@Component({
    selector: 'page-rules',
    templateUrl: 'rules.html'
})
export class RulesPage {
    constructor(public navCtrl: NavController, public navParams: NavParams, public localizationService: LocalizationService) { }
}
