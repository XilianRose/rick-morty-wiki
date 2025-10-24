import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../../models/characters.model';
import { CharactersService } from '../../../services/characters.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './character-details.html',
  styleUrl: './character-details.scss'
})

export class CharacterDetails {
  private charactersService = inject(CharactersService);
  private route = inject(ActivatedRoute);
  character!: Character;

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.charactersService.getCharacterById(id).subscribe(character => {
        this.character = character;
      });
    }
  }
}
