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
};

