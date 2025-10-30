import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodesService } from '../../../services/episodes.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Character } from '../../../models/characters.model';
import { CharactersService } from '../../../services/characters.service';
import { Episode } from '../../../models/episodes.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-episode-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './episode-details.html',
  styleUrl: './episode-details.scss'
})
export class EpisodeDetails {
  private episodeService = inject(EpisodesService);
  private charactersService = inject(CharactersService);
  private route = inject(ActivatedRoute);

  episode!: Episode
  characters: Character[] = [];

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.episodeService.getEpisodeById(id).subscribe(episode => {
        this.episode = episode;
        this.loadCharacters();
      });
    }
  }
  
  loadCharacters() {
      const episodeRequests = this.episode.characters.map(url =>
        this.charactersService.getCharacterByUrl(url)
      );
  
      forkJoin(episodeRequests).subscribe(characters => {
        this.characters = characters;
        console.log('Characters loaded:', this.characters);
      });
    }
}

