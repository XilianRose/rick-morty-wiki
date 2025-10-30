import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterResponse, Character } from '../models/characters.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.apiUrl}?page=${page}`);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }

  getCharacterByUrl(url: string): Observable<Character> {
    return this.http.get<Character>(url);
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
  }): Observable<CharacterResponse> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params = params.append(key, value);
      }
    });
    return this.http.get<CharacterResponse>(this.apiUrl, { params });
  }
}
