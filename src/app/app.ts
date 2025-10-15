import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';

import { CharacterCard } from './components/character-card/character-card';

interface location {
  name: string;
  url: string;
} 

export interface Character {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: location;
  name: string;
  origin: location;
  species: string;
  status: string;
  type: string;
  url: string;
}

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

interface ApiResponse {
  info: Info;
  results: Character[];
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule, RouterModule, CharacterCard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = 'Rick and Morty Wiki';
  protected readonly searchBar = new FormControl();
  protected readonly searchString$: Observable<string> = this.searchBar.valueChanges;
  protected results$!: Observable<Character[]>;
  protected info$!: Observable<Info>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.searchString$.subscribe(value => {
      console.log(value);
    }); 

    const apiResponse$ = this.http.get<ApiResponse>('https://rickandmortyapi.com/api/character').pipe(shareReplay());

    apiResponse$.subscribe(result => {
      console.log(result);
    });

    this.results$ = apiResponse$.pipe(
      map(response => response.results)
    );

    this.info$ = apiResponse$.pipe(
      map(response => response.info)
    );

    this.results$ = combineLatest([this.results$, this.searchString$]).pipe(
      map(([results, search]) => 
        results.filter(character => 
          character.name.toLowerCase().includes((search ?? '').toLowerCase())
        )
      )
    );

  }

  onSearch() {
  }
}
