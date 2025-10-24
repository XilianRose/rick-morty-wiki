import { Component, inject, OnInit, signal } from '@angular/core';
import { CharactersService } from '../../../services/characters.service';
import { Character } from '../../../models/characters.model';
import { CharacterCard } from '../../character-card/character-card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-characters',
  imports: [CharacterCard, CommonModule, RouterModule],
  templateUrl: './characters.html',
  styleUrl: './characters.scss'
})

export class Characters implements OnInit {
  private charactersService = inject(CharactersService);

  totalPages = signal<number>(0);
  currentPage = signal<number>(1);
  totalCharacters = signal<number>(0);
  characters = signal<Character[]>([]);
  loading = signal<boolean>(false);

  ngOnInit() {
    this.loadCharacters(1);
  }

  loadCharacters(page: number) {
    this.loading.set(true);
    this.charactersService.getCharacters(page).subscribe({
      next: (response) => {
        this.characters.set(response.results);
        this.totalPages.set(response.info.pages);
        this.totalCharacters.set(response.info.count);
        this.currentPage.set(page);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading characters:', error);
        this.loading.set(false);
      }
    });
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.loadCharacters(this.currentPage() + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.loadCharacters(this.currentPage() - 1);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.loadCharacters(page);
    }
  }
}
