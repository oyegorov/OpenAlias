import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Game } from '../pages/game/game';
import { GameMenu } from '../pages/game-menu/game-menu';
import { GameInfoPage } from '../pages/game-info/game-info';
import { SettingsPage } from "../pages/settings/settings";
import { TeamsPage } from "../pages/teams/teams";
import { DictionariesSelectionPage } from "../pages/dictionaries-selection/dictionaries-selection"
import { GameService } from '../providers/game-service';
import { GameSettingsService } from '../providers/game-settings-service';
import { WordService } from '../providers/word-service';
import { RoundCorrectionsPage } from "../pages/round-corrections/round-corrections";
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
    declarations: [
        MyApp,
        GameMenu,
        GameInfoPage,
        Game,
        SettingsPage,
        TeamsPage,
        DictionariesSelectionPage,
        RoundCorrectionsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        GameMenu,
        GameInfoPage,
        Game,
        SettingsPage,
        TeamsPage,
        DictionariesSelectionPage,
        RoundCorrectionsPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, GameService, GameSettingsService, WordService]
})
export class AppModule { }
