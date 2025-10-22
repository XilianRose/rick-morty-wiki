import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, Character } from '../models/characters.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?page=${page}`);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }

  getMultipleCharacters(ids: number[]): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.apiUrl}/${ids.join(',')}`);
  }

  filterCharacters(filters: {
    name?: string;
    status?: string;
    species?: string;
    type?: string;
    gender?: string;
  }): Observable<ApiResponse> {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return this.http.get<ApiResponse>(`${this.apiUrl}?${params.toString()}`);
  }
}
