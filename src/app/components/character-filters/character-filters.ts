import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-filters',
  imports: [CommonModule],
  templateUrl: './character-filters.html',
  styleUrl: './character-filters.scss'
})
export class CharacterFilters {
  filtersChanged = output< { name?: string; status?: string; species?: string; gender?: string } >();

  onFilterChange (filters: { name?: string; status?: string; species?: string; gender?: string }) {
    this.filtersChanged.emit(filters);
  }
}
