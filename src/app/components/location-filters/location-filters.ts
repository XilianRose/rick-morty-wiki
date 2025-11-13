import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-filters',
  imports: [CommonModule],
  templateUrl: './location-filters.html',
  styleUrl: './location-filters.scss'
})
export class LocationFilters {
  filtersChanged = output< { name?: string; type?: string; dimension?: string } >();

  onFilterChange (filters: { name?: string; type?: string; dimension?: string }) {
    this.filtersChanged.emit(filters);
  }
}
