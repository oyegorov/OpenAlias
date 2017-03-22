import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Dictionary, DictionaryInfo, dictionaries } from "../data/dictionaries"

@Injectable()
export class WordService {
    private wordPool: string[];
    private wordPointer: number;

    constructor() {
        this.wordPointer = 0;
        this.wordPool = [];
    }

    public getDictionaries(): DictionaryInfo[] {
        let availableDictionaries: DictionaryInfo[] = [];

        dictionaries.forEach((element, index) => {
            availableDictionaries.push({
                id: index,
                description: element.description,
                difficulty: element.difficulty,
                language: element.language,
                name: element.name
            });
        });

        return availableDictionaries;
    }

    public useDictionaries(dictionaryIds: number[]) {
        if (dictionaryIds == null) {
            console.error('dictionaryIds must be non-null');
            return;
        }

        this.wordPool = [];
        dictionaryIds.forEach((id) => {
            this.wordPool = this.wordPool.concat(dictionaries[id].words);
        });

        this.wordPool = this.shuffle(this.wordPool);
        this.wordPointer = 0;
    }

    public getWords(n: number): string[] {
        if (this.wordPointer + n > this.wordPool.length) {
            console.info('Not enough words in the word pool');
            return [];
        }

        let words = this.wordPool.slice(this.wordPointer, n);
        this.wordPointer += n;
        return words;
    }

    shuffle(array: any[]) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
}
