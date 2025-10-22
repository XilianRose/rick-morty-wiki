import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode, EpisodeResponse } from '../models/episodes.model';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {
  private apiUrl = 'https://rickandmortyapi.com/api/episode';

  constructor(private http: HttpClient) {}

  getEpisodes(page: number = 1): Observable<EpisodeResponse> {
    return this.http.get<EpisodeResponse>(`${this.apiUrl}?page=${page}`);
  }

  getEpisodeById(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}/${id}`);
  }

  filterEpisodes(filters: {
    name?: string;
    episode?: string;
  }): Observable<EpisodeResponse> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params = params.append(key, value);
      }
    });
    return this.http.get<EpisodeResponse>(`${this.apiUrl}?${params.toString()}`);
  }
}