import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Game } from '../pages/game/game';
import { GameMenu } from '../pages/game-menu/game-menu';
import { GameInfoPage } from '../pages/game-info/game-info';
import { SettingsPage } from "../pages/settings/settings";
import { TeamsPage } from "../pages/teams/teams";

import { GameService } from '../providers/game-service';
import { GameSettingsService } from '../providers/game-settings-service';
import { WordService } from '../providers/word-service';

@NgModule({
    declarations: [
        MyApp,
        GameMenu,
        GameInfoPage,
        Game,
        SettingsPage,
        TeamsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        GameMenu,
        GameInfoPage,
        Game,
        SettingsPage,
        TeamsPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, GameService, GameSettingsService, WordService]
})
export class AppModule { }
