import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Game } from '../pages/game/game';
import { GameMenu } from '../pages/game-menu/game-menu';

import { GameService} from '../providers/game-service'

@NgModule({
  declarations: [
    MyApp,
    GameMenu,
    Game
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GameMenu,
    Game
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, GameService]
})
export class AppModule {}
