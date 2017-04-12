import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TranslateService } from 'ng2-translate';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalizationService {
    private language: string;

    constructor(private translate: TranslateService, private storage: Storage) {
        this.translate.setDefaultLang('en');
    }

    public initialize() {
        this.storage.ready().then(() => {
            this.storage.get('language').then((s) => {
                if (s) {
                    this.translate.use(s);
                    this.language = s;
                } else {
                    var userLang = navigator.language.split('-')[0];
                    userLang = /(be|uk|ru)/gi.test(userLang) ? 'ru' : 'en';

                    this.language = userLang;
                    this.translate.use(userLang);
                }
            });
        });
    }

    public setLanguage(language: string): void {
        this.language = language;

        this.translate.use(language);
        this.storage.set('language', language);
    }

    public getLanguage(): string {
        return this.language;
    }
}
