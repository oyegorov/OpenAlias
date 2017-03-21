import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Dictionary, dictionaries } from "../data/dictionaries"

/*
  Generated class for the GameService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GameService {
    private words: string[];

    constructor() {
    }

    getWords(): string[] {
        let dictionary: Dictionary = dictionaries[0];
        this.words = this.shuffle(dictionary.words).slice(0, 7);

        return this.words;
    };

    shuffle(array: any[]) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
}
