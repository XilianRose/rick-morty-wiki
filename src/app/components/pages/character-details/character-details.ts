import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character } from '../../../models/characters.model';
import { CharactersService } from '../../../services/characters.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Episode } from '../../../models/episodes.model';
import { EpisodesService } from '../../../services/episodes.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-character-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './character-details.html',
  styleUrl: './character-details.scss'
})
export class CharacterDetails {
  private charactersService = inject(CharactersService);
  private episodesService = inject(EpisodesService);
  private route = inject(ActivatedRoute);

  character!: Character;
  episodes: Episode[] = [];

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.charactersService.getCharacterById(id).subscribe(character => {
        this.character = character;
        this.loadEpisodes();
      });
    }
  }

  loadEpisodes() {
    const episodeRequests = this.character.episode.map(url =>
      this.episodesService.getEpisodeByUrl(url)
    );

    forkJoin(episodeRequests).subscribe(episodes => {
      this.episodes = episodes;
      console.log('Episodes loaded:', this.episodes);
    });
  }
}
