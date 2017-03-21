import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the GameService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GameService {
    private words: string[];

  constructor(public http: Http) {
      console.log('Hello GameService Provider');

      this.words = [];

      this.words.push("aaaaa");
      this.words.push("bbb");
      this.words.push("cccc");
  }

  getWords(): string[] {
      return this.words;
  };
}
