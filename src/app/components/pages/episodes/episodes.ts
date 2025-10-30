import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodesService } from '../../../services/episodes.service';
import { Episode } from '../../../models/episodes.model';
import { EpisodeCard } from '../../episode-card/episode-card';
import { RouterLink } from "@angular/router";
import { switchMap, forkJoin, map, catchError, of } from 'rxjs';

interface SeasonGroup {
  season: number;
  episodes: Episode[];
  expanded: boolean;
}

@Component({
  selector: 'app-episodes',
  imports: [CommonModule, EpisodeCard, RouterLink],
  templateUrl: './episodes.html',
  styleUrl: './episodes.scss'
})
export class Episodes implements OnInit {
  private episodesService = inject(EpisodesService);

  allEpisodes = signal<Episode[]>([]);
  loading = signal<boolean>(false);
  expandedSeasons = signal<Set<number>>(new Set());
  currentSeasonPage = signal<number>(1);
  seasonsPerPage = 1;

  seasons = computed(() => {
    const episodes = this.allEpisodes();
    const seasonMap = new Map<number, Episode[]>();

    // Group episodes by season
    episodes.forEach(episode => {
      const seasonMatch = episode.episode.match(/S(\d+)E\d+/);
      if (seasonMatch) {
        const season = parseInt(seasonMatch[1]);
        if (!seasonMap.has(season)) {
          seasonMap.set(season, []);
        }
        seasonMap.get(season)!.push(episode);
      }
    });

    // Convert to array and sort
    const seasonGroups: SeasonGroup[] = Array.from(seasonMap.entries())
      .map(([season, episodes]) => ({
        season,
        episodes: episodes.sort((a, b) => {
          const aEp = parseInt(a.episode.match(/E(\d+)/)![1]);
          const bEp = parseInt(b.episode.match(/E(\d+)/)![1]);
          return aEp - bEp;
        }),
        expanded: this.expandedSeasons().has(season)
      }))
      .sort((a, b) => a.season - b.season);

    return seasonGroups;
  });

  totalSeasonPages = computed(() => {
    return Math.ceil(this.seasons().length / this.seasonsPerPage);
  });

  visibleSeasons = computed(() => {
    const allSeasons = this.seasons();
    const startIndex = (this.currentSeasonPage() - 1) * this.seasonsPerPage;
    const endIndex = startIndex + this.seasonsPerPage;
    return allSeasons.slice(startIndex, endIndex);
  });

  ngOnInit() {
    this.loadAllEpisodes();
  }

  loadAllEpisodes() {
    this.loading.set(true);
    this.episodesService.getEpisodes().pipe(
      switchMap( firstPage => {
        const totalPages = firstPage.info.pages;
        const allRequests: ReturnType<typeof this.episodesService.getEpisodes>[] = [];
        
        // Create requests for all pages
        for (let page = 1; page <= totalPages; page++) {
          allRequests.push(this.episodesService.getEpisodes(page));
        }
        return forkJoin(allRequests);
      }), 
      map( responses => responses.flatMap(r => r.results)),
      catchError( error => {
        console.error('Error loading episodes:', error);
        this.loading.set(false);
        return of([] as Episode[]);
      })
    ).subscribe( allEps => {
      this.allEpisodes.set(allEps)
      this.loading.set(false);
    });
  }

  toggleSeason(season: number) {
    const expanded = new Set(this.expandedSeasons());
    if (expanded.has(season)) {
      expanded.delete(season);
    } else {
      expanded.add(season);
    }
    this.expandedSeasons.set(expanded);
  }

  getVisibleEpisodes(seasonGroup: SeasonGroup): Episode[] {
    return seasonGroup.expanded ? seasonGroup.episodes : seasonGroup.episodes.slice(0, 4);
  }

  nextSeasonPage() {
    if (this.currentSeasonPage() < this.totalSeasonPages()) {
      this.currentSeasonPage.set(this.currentSeasonPage() + 1);
    }
  }

  previousSeasonPage() {
    if (this.currentSeasonPage() > 1) {
      this.currentSeasonPage.set(this.currentSeasonPage() - 1);
    }
  }
}
