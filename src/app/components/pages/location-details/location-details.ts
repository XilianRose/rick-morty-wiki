import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Character } from '../../../models/characters.model';
import { CharactersService } from '../../../services/characters.service';
import { Location } from '../../../models/locations.model';
import { LocationsService } from '../../../services/locations.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-location-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './location-details.html',
  styleUrl: './location-details.scss'
})
export class LocationDetails {
  private locationService = inject(LocationsService);
  private charactersService = inject(CharactersService);
  private route = inject(ActivatedRoute);

  location!: Location;
  residents: Character[] = [];

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.locationService.getLocationById(id).subscribe(location => {
        this.location = location;
        this.loadResidents();
      });
    }
  }

  loadResidents() {
    const residentRequests = this.location.residents.map(url =>
      this.charactersService.getCharacterByUrl(url)
    );

    forkJoin(residentRequests).subscribe(residents => {
      this.residents = residents;
      console.log('Residents loaded:', this.residents);
    });
  }
}
