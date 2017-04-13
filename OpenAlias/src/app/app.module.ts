import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Game } from '../pages/game/game';
import { GameMenu } from '../pages/game-menu/game-menu';
import { GameInfoPage } from '../pages/game-info/game-info';
import { GameResultsPage } from '../pages/game-results/game-results';
import { SettingsPage } from "../pages/settings/settings";
import { TeamsPage } from "../pages/teams/teams";
import { RulesPage } from "../pages/rules/rules";
import { DictionariesSelectionPage } from "../pages/dictionaries-selection/dictionaries-selection"
import { GameService } from '../providers/game-service';
import { GameSettingsService } from '../providers/game-settings-service';
import { WordService } from '../providers/word-service';
import { LocalizationService } from '../providers/localization-service';
import { RoundCorrectionsPage } from "../pages/round-corrections/round-corrections";
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { Http, HttpModule } from '@angular/http';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/localization', '.json');
}

@
NgModule({
    declarations: [
        MyApp,
        GameMenu,
        GameInfoPage,
        Game,
        SettingsPage,
        TeamsPage,
        RulesPage,
        DictionariesSelectionPage,
        RoundCorrectionsPage,
        GameResultsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        TranslateModule.forRoot({
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        }),
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        GameMenu,
        GameInfoPage,
        Game,
        SettingsPage,
        TeamsPage,
        RulesPage,
        DictionariesSelectionPage,
        RoundCorrectionsPage,
        GameResultsPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, GameService, GameSettingsService, WordService, LocalizationService]
})
export class AppModule { }
