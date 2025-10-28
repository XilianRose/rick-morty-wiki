import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodesService } from '../../../services/episodes.service';
import { RouterModule } from '@angular/router';
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
  characterNames: string[] = [];

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.episodeService.getEpisodeById(id).subscribe(episode => {
        this.episode = episode;
      });
    }
  }
  
  loadCharacters() {
      const episodeRequests = this.episode.characters.map(url =>
        this.charactersService.getCharacterByUrl(url)
      );
  
      forkJoin(episodeRequests).subscribe(characters => {
        this.characterNames = characters.map(char => char.name);
        console.log('Characters loaded:', this.characterNames);
      });
    }
}

