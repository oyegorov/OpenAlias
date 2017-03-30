import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Dictionary, DictionaryInfo, dictionaries } from "../data/dictionaries"

@Injectable()
export class WordService {
    private wordPointers: number[];
    private dictionaryIds: number[];
    private usedWords: string[];

    constructor() {
        this.wordPointers = [];
        this.dictionaryIds = [];
        this.usedWords = [];

        dictionaries.forEach((element, index) => {
            this.wordPointers.push(0);
        });
    }

    public getDictionaries(): DictionaryInfo[] {
        let availableDictionaries: DictionaryInfo[] = [];

        dictionaries.forEach((element, index) => {
            availableDictionaries.push({
                id: index,
                description: element.description,
                difficulty: element.difficulty,
                language: element.language,
                name: element.name,
                wordCount: element.words.length
            });
        });

        return availableDictionaries;
    }

    public useDictionaries(dictionaryIds: number[]) {
        if (dictionaryIds == null) {
            console.error('dictionaryIds must be non-null');
            return;
        }

        this.dictionaryIds = dictionaryIds;

        dictionaryIds.forEach(id => {
            if (this.wordPointers[id] == 0) {
                dictionaries[id].words = this.shuffle(dictionaries[id].words);
            }
        });
    }

    public getWords(n: number): string[] {
        if (this.dictionaryIds.length === 0)
            return [];

        let wordsPerDictionary = Math.ceil(n / this.dictionaryIds.length);

        let words: string[] = [];
        for (let i = 0; i < this.dictionaryIds.length; i++) {
            for (let j = 0; j < wordsPerDictionary; j++) {
                words.push(this.getWordFromDictionary(this.dictionaryIds[i]));
            }
        }

        words = this.shuffle(words);

        return words.slice(0, n);
    }

    getWordFromDictionary(dictionaryId: number): string {
        if (this.wordPointers[dictionaryId] === dictionaries[dictionaryId].words.length - 1) {
            this.wordPointers[dictionaryId] = 0;
            dictionaries[dictionaryId].words = this.shuffle(dictionaries[dictionaryId].words);
            this.usedWords = [];
        }

        let nextWord: string = dictionaries[dictionaryId].words[this.wordPointers[dictionaryId]];
        this.wordPointers[dictionaryId]++;
        if (this.usedWords.indexOf(nextWord) === -1) {
            this.usedWords.push(nextWord);
            return nextWord;
        } else {
            this.wordPointers[dictionaryId]++;
            return this.getWordFromDictionary(dictionaryId);
        }
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
