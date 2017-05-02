import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ViewController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Game } from '../pages/game/game';
import { GameMenu } from '../pages/game-menu/game-menu';
import { LocalizationService } from '../providers/localization-service';
import { SoundService } from '../providers/sound-service';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = GameMenu;

    pages: Array<{ title: string, component: any }>;

    constructor(public platform: Platform, public localizationService: LocalizationService, public soundService: SoundService) {
        this.initializeApp();
    }

    initializeApp() {
        this.localizationService.initialize();

        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            if (Splashscreen) {
                setTimeout(() => {
                    Splashscreen.hide();
                }, 100);
            }

            this.preloadSounds();
        });

        this.platform.registerBackButtonAction(() => {
            let activeView: ViewController = this.nav.getActive();

            if (activeView != null) {
                if (this.nav.canGoBack()) {
                    this.nav.pop();
                } else if (typeof activeView.instance.handleBackButton === 'function')
                    activeView.instance.handleBackButton();

                else this.nav.parent.select(0);
            }
        }, 1);
    }

    private preloadSounds() {
        this.soundService.preloadSound('ding', 'ding.mp3');
        this.soundService.preloadSound('skip', 'skip.mp3');
        this.soundService.preloadSound('cancel', 'cancel.mp3');
        this.soundService.preloadSound('ticking', 'ticking.mp3');
        this.soundService.preloadSound('alarm', 'alarm.mp3');
    }
}
