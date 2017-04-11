import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TranslateService } from 'ng2-translate';
import { Storage } from '@ionic/storage';

@Injectable()
export class LocalizationService {
    constructor(private translate: TranslateService, private storage: Storage) {
        this.translate.setDefaultLang('en');
    }

    public initialize() {
        this.storage.ready().then(() => {
            this.storage.get('language').then((s) => {
                if (s) {
                    this.translate.use(s);
                } else {
                    this.translate.use('en');
                }
            });
        });
    }

    public setLanguage(language: string): void {
        this.translate.use(language);
        this.storage.set('language', language);
    }
}
