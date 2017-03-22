import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Game } from '../pages/game/game';
import { GameMenu } from '../pages/game-menu/game-menu';
import { SettingsPage } from "../pages/settings/settings";

import { GameService } from '../providers/game-service';
import { GameSettingsService } from '../providers/game-settings-service';
import { WordService } from '../providers/word-service';

@NgModule({
    declarations: [
        MyApp,
        GameMenu,
        Game,
        SettingsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        GameMenu,
        Game,
        SettingsPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, GameService, GameSettingsService, WordService]
})
export class AppModule { }
