import { Component, Input } from '@angular/core';
import { Character } from '../../app';

@Component({
  selector: 'app-character-card',
  imports: [],
  templateUrl: './character-card.html',
  styleUrl: './character-card.scss'
})

export class CharacterCard {
  @Input() character!: Character;

  getFirstEpisode(): string {
    if (this.character.episode && this.character.episode.length > 0) {
      const episodeUrl = this.character.episode[0];
      const episodeNumber = episodeUrl.split('/').pop();
      return `Episode ${episodeNumber}`;
    }
    return 'Pilot';
  }
};

