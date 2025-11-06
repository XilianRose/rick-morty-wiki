import { Component, inject, OnInit, signal } from '@angular/core';
import { LocationsService } from '../../../services/locations.service';
import { Location } from '../../../models/locations.model';
import { LocationCard } from '../../location-card/location-card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-locations',
  imports: [CommonModule, RouterModule, LocationCard],
  templateUrl: './locations.html',
  styleUrl: './locations.scss'
})
export class Locations implements OnInit {
  private locationsService = inject(LocationsService);

  totalPages = signal<number>(0)
  currentPage = signal<number>(1);
  totalLocations = signal<number>(0);
  locations = signal<Location[]>([])
  loading = signal<boolean>(false);

  ngOnInit() {
    this.loadLocations(1);
  }

  loadLocations(page: number) {
    this.loading.set(true);
    this.locationsService.getLocations(page).subscribe({
      next: (response) => {
        this.locations.set(response.results);
        this.totalPages.set(response.info.pages);
        this.currentPage.set(page);
        this.totalLocations.set(response.info.count);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading locations', error);
        this.loading.set(false);
      }
    });
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.loadLocations(this.currentPage() + 1);
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.loadLocations(this.currentPage() - 1);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.loadLocations(page);
    }
  }
}
