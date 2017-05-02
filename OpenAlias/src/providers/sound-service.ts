import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NativeAudio } from 'ionic-native';
import { GameSettingsService } from "../providers/game-settings-service";

@Injectable()
export class SoundService {
    private loadedSounds = [];

    public setVolume(volume: number) {
        this.loadedSounds.forEach(s => {
            NativeAudio.setVolumeForComplexAsset(s, volume);
        });
    }

    public preloadSound(id: string, fileName: string) {
        NativeAudio.preloadComplex(id, 'assets/audio/' + fileName, 0.5, 1, 0);
        this.loadedSounds.push(id);
    }

    public play(id: string) {
        NativeAudio.play(id);
    }

    public stop(id: string) {
        NativeAudio.stop(id);
    }

    constructor(private settingsService: GameSettingsService) {
    }
}
